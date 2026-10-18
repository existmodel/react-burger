import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '@services/api/baseQueryWithReauth';

import type { TIngredient } from '@utils/types';

type TIngredientsResponse = {
  data: TIngredient[];
};

type TOrderResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export const burgerApi = createApi({
  reducerPath: 'burgerApi',

  baseQuery: baseQueryWithReauth,

  tagTypes: ['Ingredients', 'Order'],

  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredientsResponse, void>({
      query: () => ({
        url: `ingredients`,
        method: 'GET',
      }),
      providesTags: ['Ingredients'],
    }),

    postOrder: builder.mutation<TOrderResponse, string[]>({
      query: (ingredients) => ({
        url: 'orders',
        method: 'POST',
        body: { ingredients },
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const { useGetIngredientsQuery, usePostOrderMutation } = burgerApi;
