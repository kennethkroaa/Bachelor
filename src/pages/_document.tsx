import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { InjectionMode, resetIds, Stylesheet } from 'office-ui-fabric-react';
import * as React from 'react';

interface DocumentTypes {
    styleTags: string;
}
class MyDocument extends Document<DocumentTypes> {
    render() {
        return (
            <Html style={{ height: '100%'}}>
                <Head>
                    <style>{`
                        #__next { height: 100% }
                    `}
                    </style>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="theme-color" content="#000000"/>
                    <meta charSet="utf-8" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png"/>
                    <link rel="manifest" href="/manifest.json"/>
                    <style type="text/css" dangerouslySetInnerHTML={{__html: this.props.styleTags}} />
                </Head>
                <body style={{margin: '0 !important', height: '100%'}}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
    const stylesheet = Stylesheet.getInstance();
    const originalRenderPage = ctx.renderPage;

    //Allow Fabric components to be rendered server-side
    stylesheet.setConfig({
        injectionMode: InjectionMode.none,
        namespace: 'server'
    });
    stylesheet.reset();
    resetIds();

    ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => <App { ...props } />
    });

    const initialProps = await Document.getInitialProps(ctx);
    
    return { 
        ...initialProps, 
        styleTags: stylesheet.getRules(true) 
    }
}

export default MyDocument