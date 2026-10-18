import { createSlice } from '@reduxjs/toolkit';

import { authApi } from '@services/api/authApi';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TUser } from '@utils/types';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },

    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
  },
  selectors: {
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectUser: (state) => state.user,
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
      })
      .addMatcher(authApi.endpoints.updateUser.matchFulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { selectUser, selectIsAuthChecked } = authSlice.selectors;
export const { setIsAuthChecked, setUser } = authSlice.actions;
