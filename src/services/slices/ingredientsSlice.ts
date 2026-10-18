import { createSlice } from '@reduxjs/toolkit';

import type { TIngredient } from '@utils/types';

const initialState: TIngredientsState = {
  selectedIngredient: null,
  isOrderModalOpen: false,
  orderNumber: null,
};

type TIngredientsState = {
  selectedIngredient: TIngredient | null;
  isOrderModalOpen: boolean;
  orderNumber: number | null;
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,

  reducers: {
    openOrderModal: (state) => {
      state.isOrderModalOpen = true;
    },

    closeOrderModal: (state) => {
      state.isOrderModalOpen = false;
    },

    setOrderNumber: (state, action: { payload: number | null }) => {
      state.orderNumber = action.payload;
    },
  },
});

export const { openOrderModal, closeOrderModal, setOrderNumber } =
  ingredientsSlice.actions;
