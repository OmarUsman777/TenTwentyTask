import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
export const getServerError = (error: FetchBaseQueryError | SerializedError) => {
    // if data object exist in the error response that
    // means its the error returned by the server
    if (error && "data" in error) {
        return error.data as any;
    }
    return null;
};
