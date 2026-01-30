import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axiosBaseQuery'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export type Post = {
  id: number
  title: string
  body: string
  userId: number
}

export type Comment = {
  id: number
  name: string
  email: string
  body: string
}

export type GetPostsParams = {
  title_like?: string
  userId?: number | string
  _page?: number
  _limit?: number
  _sort?: string
  _order?: 'asc' | 'desc'
  [key: string]: any
}

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: axiosBaseQuery(baseUrl),
  tagTypes: ['Post', 'Comment'],
  endpoints: builder => ({
    getPosts: builder.query<Post[], GetPostsParams | void>({
      query: params => ({
        url: '/posts',
        method: 'GET',
        params,
      }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Post' as const, id })), 'Post']
          : ['Post'],
    }),

    getPost: builder.query<Post, number>({
      query: id => ({
        url: `/posts/${id}`,
        method: 'GET',
      }),
      providesTags: (_, __, id) => [{ type: 'Post', id }],
    }),

    createPost: builder.mutation<Post, Omit<Post, 'id'>>({
      query: postData => ({
        url: '/posts',
        method: 'POST',
        data: postData,
      }),
      invalidatesTags: ['Post'],
    }),

    getCommentsByPostId: builder.query<Comment[], string | number>({
      query: postId => ({
        url: `/posts/${postId}/comments`,
        method: 'GET',
      }),
      providesTags: comments =>
        comments
          ? [
              ...comments.map(({ id }) => ({ type: 'Comment' as const, id })),
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
