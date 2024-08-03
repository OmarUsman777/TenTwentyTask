import { configureStore, Middleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import setupNetworkInspect from "./setupNetworkInspect";
import { appApi } from "./api/rtk-query-init";

// redux store configuration
export const createStore = () => {
    // @ts-ignore
    if (typeof global.__REMOTEDEV__ !== "undefined") {
        setupNetworkInspect();
    }

    const store = configureStore({
        devTools: true,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                immutableCheck: false,
                serializableCheck: false,
            }).concat([
                appApi.middleware as Middleware,
            ]),
        reducer: rootReducer,
    });

    return store;
};
