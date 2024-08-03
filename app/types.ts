import { appApi } from "./api/rtk-query-init";


export interface PlainObject {
    [key: string]: any;
}


export interface TestProps {
    /** test id used to locate this component in tests */
    testID?: string;
}


export enum Tags {
    MOVIES_LIST = "MOVIES_LIST",
}


export interface State {
    [appApi.reducerPath]: ReturnType<typeof appApi.reducer>;
}
