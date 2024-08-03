import { combineReducers } from "@reduxjs/toolkit";
import { appApi } from "./api/rtk-query-init";
import { State } from "./types";

// Define the shape of the state for the combined reducer
const combinedReducer = combineReducers({
    [appApi.reducerPath]: appApi.reducer,
});

// Create a root reducer with the combined reducers
const rootReducer = (state: State | undefined, action: any) => {
    return combinedReducer(state, action);
};

export default rootReducer;
