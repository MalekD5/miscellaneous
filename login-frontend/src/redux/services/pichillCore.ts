import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Data {
  _id: string;
  title: string;
  messsage: string;
  creator: string;
  tags: string[];
  likeCount: number;
  createdAt: typeof Date;
}

export const pichillCore = createApi({
  reducerPath: 'pichillCore',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_PICHILL_BACKEND_URL,
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Data[], void>({ query: () => '/posts/' }),
    deletePost: builder.mutation<{}, Pick<Data, '_id'>>({
      query: ({ _id }) => ({
        url: '/posts/',
        method: 'DELETE',
        body: {
          id: _id,
        },
      }),
    }),
  }),
});

export const { useGetPostsQuery, useDeletePostMutation } = pichillCore;
