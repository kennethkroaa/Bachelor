import 'flag-icon-css/css/flag-icon.css';
import withRedux from "next-redux-wrapper";
import App, { AppContext } from 'next/app';
import { Fabric, initializeIcons } from "office-ui-fabric-react";
import React from "react";
import { Provider } from "react-redux";
import { compose } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import { appWithTranslation, i18n, Router } from '../../i18n';
import { makeStore } from "../store/makeStore";
import KiskbaAppProps from "../types/pages/_app.types";

if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React);
}

initializeIcons(undefined, { disableWarnings: true });
class MyApp extends App<KiskbaAppProps> {
    //Quick, very hacky way to check for change in URL hash
    componentDidMount() {
        const isBrowser = typeof window !== 'undefined';

        if(isBrowser){
            //First page load, no Next.js router event fires on this
            const currentUrl = window.location.href;

            //RegExp to match hash
            const expression: RegExp = /#([a-z0-9]+)/gi;

            //Handle subsequent route changes
            const handleHashChange = (url: any) => {
                const hash = url.match(expression);
                
                //Silly workaround because I couldn't get Object.defineProperty
                //on Router to work properly, so for now just emit an event that 
                //can be listened to elsewhere
                hash?.map((hash: string) => {
                    Router.events.emit("customHashChange", hash.substring(1)); //remove #
                });
            }

            handleHashChange(currentUrl);
            Router.events.on("hashChangeComplete", handleHashChange);
        }

        i18n.on('languageChanged', (language: string) => {
            document.documentElement.setAttribute('lang', language);
        })        
    }

    render() {
        const { Component, pageProps, store } = this.props;

        return (
            <Provider store={store}>
                <PersistGate persistor={(store as any).__PERSISTOR} loading={null}>
                    <Fabric>
                        <Component { ...pageProps}/>
                    </Fabric>
                </PersistGate>
            </Provider>
        );
    }
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext)
    return { ...appProps }
}

export default compose(
    withRedux(makeStore),
    appWithTranslation
)(MyApp);