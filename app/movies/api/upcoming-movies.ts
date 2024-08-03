import { appApi } from "../../api/rtk-query-init";
import { objKeysToCamelCase } from "../../utils";
import { Tags } from "../../types";

const parseGetEventsResponse = (raw: any) => {
    const result = objKeysToCamelCase(raw);
    return result;
};

const extendedApi = appApi.injectEndpoints({
    endpoints: builder => ({
        getUpcomingMovies: builder.query({
            providesTags: [Tags.MOVIES_LIST],
            query: () => "3/movie/upcoming",
            transformResponse: response => parseGetEventsResponse(response),

        }),
    }),
});

export const { useGetUpcomingMoviesQuery } = extendedApi;

export default extendedApi;