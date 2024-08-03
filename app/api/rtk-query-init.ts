import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { Tags } from "../types";

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
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODg4MjA0NmYxNWUwM2Y0MzcxODAyMGY4NWNhZWU0YiIsIm5iZiI6MTcyMjU5MDU2NC41NDQ5Niwic3ViIjoiNjZhY2E0MDQyNTU3MDY0ZWM1MGI0MWJjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.PfgquQNtfx5p55A95ZEIkaVjcyaCzHCC763FtkHcYBI'; // <-----HERE------
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
