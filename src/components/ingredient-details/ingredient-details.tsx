import type { TIngredient } from '@utils/types';

import styles from './ingredient-details.module.css';

type TIngredientDetailsProps = {
  ingredient: TIngredient;
};

export const IngredientDetails = ({
  ingredient,
}: TIngredientDetailsProps): React.JSX.Element => {
  return (
    <div className={`${styles.container} pb-15`}>
      <img src={ingredient.image_large} alt={ingredient.image_large} className="mb-4" />
      <h3 className="text text_type_main-medium mb-8">{ingredient.name}</h3>
      <div>
        <ul
          className={`${styles.ingredientList} text text_type_main-default text_color_inactive  `}
        >
          <li
            className={`${styles.ingredientItem} text text_type_main-default text_color_inactive mr-5 `}
          >
            <span>Калории,ккал</span>
            <span className="text text_type_digits-default">{ingredient.calories}</span>
          </li>

          <li
            className={`${styles.ingredientItem} text text_type_main-default text_color_inactive mr-5 `}
          >
            <span>Белки, г</span>
            <span className="text text_type_digits-default">{ingredient.proteins}</span>
          </li>

          <li
            className={`${styles.ingredientItem} text text_type_main-default text_color_inactive mr-5 `}
          >
            <span>Жиры, г</span>
            <span className="text text_type_digits-default">{ingredient.fat}</span>
          </li>

          <li
            className={`${styles.ingredientItem}text text_type_main-default text_color_inactive mr-5 `}
          >
            <span>Углеводы, г</span>
            <span className="text text_type_digits-default">
              {ingredient.carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
