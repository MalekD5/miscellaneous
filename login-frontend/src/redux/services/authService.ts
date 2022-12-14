import {
  BaseQueryApi,
  BaseQueryFn,
} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../features/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:5000/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async (
  args,
  api,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);
  const error = result?.error;
  if (error && 'originalStatus' in error) {
    if (error.originalStatus === 403) {
      console.log('refresh token');
      const refreshResult = await baseQuery('/refresh', api, extraOptions);
      console.log(refreshResult);
      if (refreshResult?.data) {
        const user = (api.getState() as any).auth.user;
        api.dispatch(setCredentials({ ...refreshResult.data, user }));
        result = await baseQuery('/refresh', api, extraOptions);
      } else {
        api.dispatch(logOut);
      }
    }
  }
  return result;
};

export const authService = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
