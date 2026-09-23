import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { constructorSlice } from '@services/slices/constructorSlice';
import { ingredientsSlice } from '@services/slices/ingredientsSlice';

import { burgerApi } from '../utils/api';

const rootReducer = combineSlices(burgerApi, ingredientsSlice, constructorSlice);

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(burgerApi.middleware);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
