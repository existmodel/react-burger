import { createSlice, nanoid } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import type { RootState } from '../../services/store';
import type {
  TIngredient,
  TConstructorIngredient,
  TConstructorState,
} from '../../utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: TConstructorState = {
  bun: null,
  fillings: [],
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.fillings.push(action.payload);
        }
      },

      prepare: (ingredient: TIngredient) => {
        return { payload: { ...ingredient, id: nanoid() } };
      },
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.fillings = state.fillings.filter((item) => item.id !== action.payload);
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedItem = state.fillings.splice(dragIndex, 1)[0];
      state.fillings.splice(hoverIndex, 0, draggedItem);
    },
  },
});

export const { addIngredient, removeIngredient, moveIngredient } =
  constructorSlice.actions;

const selectConstructorState = (state: RootState, _?: TIngredient): TConstructorState =>
  state.burgerConstructor;

const selectIngredientArg = (_: RootState, ingredient: TIngredient): TIngredient =>
  ingredient;

export const selectIngredientCount = createSelector(
  [selectConstructorState, selectIngredientArg],

  (constructorData, currentIngredient) => {
    if (currentIngredient.type === 'bun') {
      return constructorData.bun?._id === currentIngredient._id ? 2 : 0;
    }

    return constructorData.fillings.filter((item) => item._id === currentIngredient._id)
      .length;
  }
);

export const selectTotalPrice = createSelector(
  [selectConstructorState],
  ({ bun, fillings }): number => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const sum = fillings.reduce(
      (accumulator, item) => accumulator + item.price,
      bunPrice
    );

    return sum;
  }
);
