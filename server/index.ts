/*
    Customized TypeScript Express Server based on Zeit's serve package
    https://github.com/zeit/serve/
*/

import arg from 'arg';
import boxen from 'boxen';
import chalk from 'chalk';
import { write } from 'clipboardy';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import next from 'next';
import nextI18NextMiddleware from 'next-i18next/middleware';
import os from 'os';
import { i18nInstance } from '../i18n';


/* Utilities */
const interfaces = os.networkInterfaces();

/* Environment */
const dev = process.env.NODE_ENV !== 'production'

/* Next.js */
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler();

/* Console Messages */
const warning = (message: string) => `[ ${chalk.yellow('WARNING')} ] ${message}`;
const info = (message: string) => `[ ${chalk.magenta('INFO')} ] ${message}`;
const error = (message: string) => `[ ${chalk.red('ERROR')} ] ${message}`;

const getHelp = () => chalk(`
    {bold.cyan serve} - Static file serving
    {bold USAGE}
        {bold $} {cyan serve} --help

        By default, {cyan serve} will listen on {bold 0.0.0.0:5000} and serve the
        current working directory on that address.

    {bold OPTIONS}
        -h, --help                      Shows this help message
        -p, --port                      Optional port
        --no-cors                       Disable CORS
        --no-compression                Disable compression
        --ssl-cert                      Optional path to SSL/TLS cert
        --ssl-key                       Optional path to SSL/TLS cert key
`);

const startEndpoint = (args: any, previous?: any) => {
    console.log(info("Starting endpoint..."));

    const { isTTY } = process.stdout;
    const expressApp = express();

    const endpoint =            args['--port'];
    const corsEnabled =         args['--no-cors'] !== true;
    const compressionEnabled =  args['--no-compression'] !== true;
    const clipboard =           args['--no-clipboard'] !== true;
    const httpMode =            args['--ssl-cert'] && args['--ssl-key'] ? 'https' : 'http';

    /* Initialize Express Middleware */
    expressApp.use(nextI18NextMiddleware(i18nInstance));

    if(compressionEnabled)
        expressApp.use(compression());

    if(corsEnabled)
        expressApp.use(cors());

    // handle GET request to /service.worker.js
    expressApp.get('/service-worker.js', (req, res) => {
        nextApp.serveStatic(req, res, './.next/service-worker.js');
    });

    expressApp.get('/', (req, res) => {
        return nextApp.render(req, res, '/');
    })

    expressApp.get("/form/:slug", (req, res) => {
        return nextApp.render(req, res, '/form', { formType: req.params.formType })
    })

    expressApp.get('*', (req, res) => {
        return handle(req, res);
    });

    const server = httpMode === 'https'
        ? https.createServer({
			key: fs.readFileSync(args['--ssl-key']),
			cert: fs.readFileSync(args['--ssl-cert'])
        }, expressApp)
        : http.createServer(expressApp);

    server.on('error', (err: any) => {
        console.log(error(`Failed to serve: ${err.stack}`));
        process.exit(1);
    });

    server.listen(endpoint, async () => {
        console.log(info(`Server attempting to listen on ${endpoint}...`));

        const details = server.address();
        let localAddress = '';
        let networkAddress = '';
        
        registerShutdown(() => server.close());

        if(typeof details === 'string'){
            localAddress = details;
        } else if(details !== null && typeof details === 'object' && details.port){
            const address = details.address === '::' ? 'localhost' : details.address;
            const ip = getNetworkAddress();

			localAddress = `${httpMode}://${address}:${details.port}`;
			networkAddress = `${httpMode}://${ip}:${details.port}`;
        }

        if(isTTY && process.env.NODE_ENV !== 'production'){
            let message = chalk.green('Serving!');

            if(localAddress){
				const prefix = networkAddress ? '- ' : '';
				const space = networkAddress ? '            ' : '  ';

				message += `\n\n${chalk.bold(`${prefix}Local:`)}${space}${localAddress}`;
            }

            if (networkAddress)
				message += `\n${chalk.bold('- On Your Network:')}  ${networkAddress}`;

			if (previous) 
                message += chalk.red(`\n\nThis port was picked because ${chalk.underline(previous)} is in use.`);
                
            if (clipboard) {
                try {
                    await write(localAddress);
                    message += `\n\n${chalk.grey('Copied local address to clipboard!')}`;
                } catch (err) {
                    console.error(error(`Cannot copy to clipboard: ${err.message}`));
                }
            }

			console.log(boxen(message, {
				padding: 1,
				borderColor: 'green',
				margin: 0
			}));
        } else {
			const suffix = localAddress ? ` at ${localAddress}` : '';
			console.log(info(`Accepting connections${suffix}`));
        }
    });
};

const registerShutdown = (fn: Function) => {
    let run = false;

    const wrapper = () => {
        if(!run){
            run = true;
            fn();
        }
    };

    process.on('SIGINT', wrapper);
    process.on('SIGTERM', wrapper);
    process.on('exit', wrapper);
};

const getNetworkAddress = () => {
    for (const name of Object.keys(interfaces)) {
		for (const iface of interfaces[name]) {
            const { address, family, internal } = iface;
            
			if (family === 'IPv4' && !internal)
				return address;
		}
	}
};

(async () => {
    let args = null;

	try {
		args = arg({
            '--help': Boolean,
            '--no-cors': Boolean,
            '--no-compression': Boolean,
            '--port': Number,
			'--ssl-cert': String,
			'--ssl-key': String,
            '-h': '--help',
            '-p': '--port',
		});
	} catch (err) {
		console.error(error(err.message));
		process.exit(1);
    }

    if (!args['--port']) {
        if(process.env.PORT)
            args['--port'] = Number.parseInt(process.env.PORT);
        else
		    args['--port'] = 5000;
	}

	if (args['--help']) {
		console.log(getHelp());
		return;
    }

    await nextApp.prepare().then(() => console.log(info("Next prepared...")));
    await i18nInstance.initPromise.then(() => console.log(info("i18n initialized...")));

    startEndpoint(args);

	registerShutdown(() => {
		console.log(`\n${info('Gracefully shutting down. Please wait...')}`);

		process.on('SIGINT', () => {
			console.log(`\n${warning('Force-closing all open sockets...')}`);
			process.exit(0);
		});
	});
})();