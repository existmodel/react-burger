import type { TIngredient, TOrderIngredient } from './types';

type TCounter = Record<string, TOrderIngredient>;

export const getOrderIngredients = (
  ids: string[],
  allIngredients: TIngredient[]
): TIngredient[] => {
  const ingredients = ids.map((item) =>
    allIngredients.find((element) => element._id === item)
  );
  const result = ingredients.filter((item) => item !== undefined);

  return result;
};

export const getOrderIngredientsSummary = (orderIngredients: TIngredient[]): number => {
  const sum = orderIngredients.reduce((acc, current) => {
    return acc + current.price;
  }, 0);

  return sum;
};

export const getOrderNumber = (number: number): string => {
  return number.toString().padStart(6, '0');
};

export const getGroupedOrderIngredients = (
  orderIngredients: TIngredient[]
): TOrderIngredient[] => {
  const counter: TCounter = {};

  orderIngredients.forEach((item) => {
    if (item._id in counter) {
      counter[item._id] = { ingredient: item, count: counter[item._id].count + 1 };
    } else {
      counter[item._id] = { ingredient: item, count: 1 };
    }
  });

  return Object.values(counter);
};
