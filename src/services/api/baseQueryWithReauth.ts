import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BURGER_API_URL } from '@utils/constants';
import { refreshTokens } from '@utils/token';

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: BURGER_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('authorization', token);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    try {
      await refreshTokens();

      result = await baseQuery(args, api, extraOptions);
    } catch {
      // Тип экшена строкой, чтобы избежать циклического импорта слайса
      api.dispatch({ type: 'user/setUser', payload: null });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  return result;
};
