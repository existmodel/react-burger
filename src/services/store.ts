import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { authSlice } from '@services/slices/authSlice';
import { constructorSlice } from '@services/slices/constructorSlice';
import { ingredientsSlice } from '@services/slices/ingredientsSlice';

import { authApi } from './api/authApi';
import { burgerApi } from './api/burgerApi';

const rootReducer = combineSlices(
  burgerApi,
  authApi,
  ingredientsSlice,
  constructorSlice,
  authSlice
);

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware, burgerApi.middleware);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
