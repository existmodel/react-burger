import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '@services/api/baseQueryWithReauth';

import type { TUser } from '@utils/types';

type TAuthResponse = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

type TRegisterRequest = {
  email: string;
  password: string;
  name: string;
};

type TLoginRequest = {
  email: string;
  password: string;
};

type TLogoutResponse = {
  success: boolean;
  message: string;
};

type TForgotPasswordRequest = {
  email: string;
};

type TForgotPasswordResponse = {
  success: boolean;
  message: string;
};

type TResetPasswordRequest = {
  password: string;
  token: string;
};

type TResetPasswordResponse = {
  success: boolean;
  message: string;
};

type TUpdateUserRequest = {
  email: string;
  password: string;
  name: string;
};

type TUserResponse = {
  success: boolean;
  user: TUser;
};

export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation<TUser, TRegisterRequest>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),

      transformResponse: (response: TAuthResponse) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        return response.user;
      },
    }),

    login: builder.mutation<TUser, TLoginRequest>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),

      transformResponse: (response: TAuthResponse) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        return response.user;
      },
    }),

    logout: builder.mutation<TLogoutResponse, void>({
      query: () => {
        const refreshToken = localStorage.getItem('refreshToken');

        return {
          url: 'auth/logout',
          method: 'POST',
          body: { token: refreshToken },
        };
      },
      transformResponse: (response: TLogoutResponse) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        return response;
      },
    }),

    forgotPassword: builder.mutation<TForgotPasswordResponse, TForgotPasswordRequest>({
      query: (body) => ({
        url: '/password-reset',
        method: 'POST',
        body,
      }),
    }),

    resetPassword: builder.mutation<TResetPasswordResponse, TResetPasswordRequest>({
      query: (body) => ({
        url: '/reset',
        method: 'POST',
        body,
      }),
    }),

    getUser: builder.query<TUser, void>({
      query: () => ({
        url: 'auth/user',
        method: 'GET',
      }),

      transformResponse: (response: TUserResponse) => response.user,
    }),

    updateUser: builder.mutation<TUser, TUpdateUserRequest>({
      query: (body) => ({
        url: 'auth/user',
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: TUserResponse) => response.user,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = authApi;
