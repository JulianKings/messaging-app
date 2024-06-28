import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const communityApi = createApi({
    reducerPath: 'communityApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:3000/community/'
    }),
    tagTypes: ['Community'],
    endpoints: (build) => ({
        getPopularCommunities: build.query({
            query: () => ({ url: 'popular'}),
            transformResponse: (response) => response.communities,
            transformErrorResponse: (response) => response.status,
            providesTags: (result, error, id) => [{ type: 'Community', id }],
        }),
        getLatestCommunities: build.query({
            query: () => ({ url: 'latest'}),
            transformResponse: (response) => response.communities,
            transformErrorResponse: (response) => response.status,
            providesTags: (result, error, id) => [{ type: 'Community', id }],
        })
    })
})

export const { useGetPopularCommunitiesQuery, useGetLatestCommunitiesQuery } = communityApi