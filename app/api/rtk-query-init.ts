import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { Tags } from "../types";
// @ts-ignore
import { API_TOKEN } from "react-native-dotenv"
// Serialize params correctly
const serializeParams = (input: Record<string, any>) => {
    const resList: [string, any][] = [];
    const res = new URLSearchParams();
    Object.entries(input)
        .filter(([_, value]) => value !== undefined)
        .flatMap(([key, value]) => {
            if (Array.isArray(value)) {
                value.map(e => resList.push([key, e]));
                return null;
            }
            resList.push([key, value]);
            return null;
        });
    resList.forEach(e => res.append(e[0], e[1]));
    return res.toString();
};

// Prepare headers correctly
export const getHeaders = () => {
    // SHOULD BE SET FROM STATE
    // HARD CODED TOKEN SET
    // SET YOUR BEARER TOKEN IN token,
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const token = API_TOKEN; // <-----HERE------
    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    }
    return headers;
};

// Dynamic base query function
const dynamicBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    WebApi,
    extraOptions
) => {
    const rawBaseQuery = fetchBaseQuery({
        baseUrl: "https://api.themoviedb.org/",
        paramsSerializer: params => serializeParams(params),
        prepareHeaders: () => {
            console.log("Preparing headers");
            return getHeaders();
        }
    });
    return rawBaseQuery(args, WebApi, extraOptions);
};

// Create API
export const appApi = createApi({
    baseQuery: dynamicBaseQuery,
    endpoints: () => ({}),
    reducerPath: "tenTwenty-app",
    tagTypes: Object.values(Tags), // TAGS FOR INVALIDATING RTK CACHE
});
