import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axiosBaseQuery'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: axiosBaseQuery({ baseUrl }),
  tagTypes: ['Post', 'Comment'],
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Post', id })), 'Post']
          : ['Post'],
    }),

    getPost: builder.query({
      query: id => ({
        url: `/posts/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    createPost: builder.mutation({
      query: postData => ({
        url: '/posts',
        method: 'POST',
        data: postData,
      }),
      invalidatesTags: ['Post'],
    }),

    getCommentsByPostId: builder.query({
      query: postId => ({
        url: `/posts/${postId}/comments`,
        method: 'GET',
      }),
      providesTags: (result, error, postId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Comment', id })),
              { type: 'Comment', id: 'LIST' },
            ]
          : [{ type: 'Comment', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useGetCommentsByPostIdQuery,
} = blogApi
