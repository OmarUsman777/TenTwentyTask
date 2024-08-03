import { appApi } from "../../api/rtk-query-init";
import { objKeysToCamelCase } from "../../utils";

const parseGetEventsResponse = (raw: any) => {
    const result = objKeysToCamelCase(raw);
    return result;
};

const extendedApi = appApi.injectEndpoints({
    endpoints: builder => ({
        getGenre: builder.query({
            query: () => `3/genre/movie/list`,
            transformResponse: response => parseGetEventsResponse(response),

        }),
        searchMovies: builder.query({
            query: (keyword: any) => `3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`,
            transformResponse: response => parseGetEventsResponse(response),
        }),
    }),
});

export const { useGetGenreQuery, useSearchMoviesQuery } = extendedApi;

export default extendedApi;