import { refreshTokens } from '@/utils/token';
import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from '@services/api/baseQueryWithReauth';
import { WS_FEED_URL, WS_ORDERS_URL } from '@utils/constants';

import type { TIngredient, TOrder } from '@utils/types';

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

type TOrdersResponse = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

type TSocketError = {
  success: false;
  message: string;
};

type TOrderByNumberResponse = {
  success: boolean;
  orders: TOrder[];
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

    getFeed: builder.query<TOrdersResponse, void>({
      queryFn: () => ({ data: { success: true, orders: [], total: 0, totalToday: 0 } }),
      keepUnusedDataFor: 0,
      async onCacheEntryAdded(_arg, api) {
        let socket: WebSocket | null = null;
        socket = new WebSocket(WS_FEED_URL);
        try {
          await api.cacheDataLoaded;
          const listener = (event: MessageEvent<string>): void => {
            const message = JSON.parse(event.data) as TOrdersResponse;
            api.updateCachedData((draft) => {
              draft.orders = message.orders;
              draft.total = message.total;
              draft.totalToday = message.totalToday;
            });
          };

          socket.onmessage = listener;
        } catch (error) {
          console.error('Ошибка соединения с лентой заказов:', error);
        }
        await api.cacheEntryRemoved;

        socket.close();
      },
    }),

    getProfileOrders: builder.query<TOrdersResponse, void>({
      queryFn: () => ({ data: { success: true, orders: [], total: 0, totalToday: 0 } }),
      keepUnusedDataFor: 0,
      async onCacheEntryAdded(_arg, api) {
        let socket = null as WebSocket | null;
        const RECONNECT_PERIOD = 3000;
        let reconnectTimerId = null as ReturnType<typeof setTimeout> | null;

        let isUnsubscribed = false;

        const logout = (): void => {
          isUnsubscribed = true;
          api.dispatch({ type: 'user/setUser', payload: null });
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        };

        const connect = (): void => {
          if (reconnectTimerId) {
            clearTimeout(reconnectTimerId);
            reconnectTimerId = null;
          }

          const storedToken = localStorage.getItem('accessToken');
          const token = storedToken !== null ? storedToken.replace('Bearer ', '') : '';

          socket = new WebSocket(`${WS_ORDERS_URL}?token=${token}`);

          socket.onmessage = (event: MessageEvent<string>): void => {
            const data = JSON.parse(event.data) as TOrdersResponse | TSocketError;

            if ('message' in data) {
              if (data.message === 'Invalid or missing token') {
                void reconnectWithNewToken();
              }
              return;
            }
            api.updateCachedData((draft) => {
              draft.orders = data.orders;
              draft.total = data.total;
              draft.totalToday = data.totalToday;
            });
          };

          socket.onclose = (): void => {
            if (!isUnsubscribed) {
              reconnectTimerId = setTimeout(connect, RECONNECT_PERIOD);
            }
          };
        };

        const reconnectWithNewToken = async (): Promise<void> => {
          try {
            await refreshTokens();
            if (socket) {
              socket.onclose = null;
              socket.close();
            }
            connect();
          } catch (error) {
            console.error('Не удалось обновить токен:', error);
            socket?.close();
            logout();
          }
        };

        try {
          await api.cacheDataLoaded;
          connect();
          await api.cacheEntryRemoved;
        } catch (error) {
          console.error('Ошибка соединения с историей заказов:', error);
        } finally {
          isUnsubscribed = true;

          if (reconnectTimerId) {
            clearTimeout(reconnectTimerId);
          }
          socket?.close();
        }
      },
    }),

    getOrderByNumber: builder.query<TOrder | undefined, number>({
      query: (orderNumber) => ({
        url: `orders/${orderNumber}`,
        method: 'GET',
      }),
      transformResponse: (response: TOrderByNumberResponse) => response.orders[0],
    }),
  }),
});

export const {
  useGetIngredientsQuery,
  usePostOrderMutation,
  useGetFeedQuery,
  useGetProfileOrdersQuery,
  useGetOrderByNumberQuery,
} = burgerApi;
