import { BURGER_API_URL } from '@utils/constants';

import type { TIngredient } from '@utils/types';

type TIngredientsResponse = {
  data: TIngredient[];
};

export default async function getData(): Promise<TIngredientsResponse> {
  const response = await fetch(`${BURGER_API_URL}/ingredients`);
  if (!response.ok) {
    throw new Error(`Ошибка сервера: ${response.status}`);
  }
  return (await response.json()) as TIngredientsResponse;
}
