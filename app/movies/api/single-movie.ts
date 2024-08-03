import { appApi } from "../../api/rtk-query-init";
import { objKeysToCamelCase } from "../../utils";

const parseGetEventsResponse = (raw: any) => {
    const result = objKeysToCamelCase(raw);
    return result;
};

const extendedApi = appApi.injectEndpoints({
    endpoints: builder => ({
        getSingleMovie: builder.query({
            query: (id: any) => `3/movie/${id}`,
            transformResponse: response => parseGetEventsResponse(response),

        }),
    }),
});

export const { useGetSingleMovieQuery } = extendedApi;

export default extendedApi;