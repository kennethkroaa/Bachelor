import { configureStore } from '@reduxjs/toolkit';
import { MakeStore } from 'next-redux-wrapper';
import { Reducer } from 'redux';
import createSagaMiddleware from "redux-saga";
import { rootReducer } from './rootReducer';
import rootSaga from './rootSaga';

/*
    For persistence and creation:
    https://github.com/kirill-konshin/next-redux-wrapper
*/

const configuredStore = (reducer: Reducer, initialState: any) => {
    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
        reducer: reducer,
        middleware: [
            //...getDefaultMiddleware<RootState>(),
            sagaMiddleware,
        ] as const
    })

    sagaMiddleware.run(rootSaga);

    return store;
}

export const makeStore: MakeStore = (initialState, { isServer }) => {
    if(isServer){
        initialState = initialState || {};

        return configuredStore(rootReducer, initialState);
    } else {
        const { persistStore, persistReducer } = require('redux-persist');
        const storage = require('redux-persist/lib/storage').default;

        const persistConfig = {
            key: 'nextjs',
            storage
        }

        const persistedReducer = persistReducer(persistConfig, rootReducer);
        const store = configuredStore(persistedReducer, initialState);

        (store as any).__PERSISTOR = persistStore(store);

        return store;
    }
}