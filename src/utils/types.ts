export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

export type TConstructorState = {
  bun: TIngredient | null;
  fillings: TConstructorIngredient[];
};

export type TConstructorIngredient = TIngredient & { id: string };

export type TUser = {
  email: string;
  name: string;
};
