import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types';

import styles from './ingredients-card.module.css';

type TIngredientCardProps = {
  ingredient: TIngredient;
  count?: number;
  onIngredientClick: (ingredient: TIngredient) => void;
};

export const IngredientCard = ({
  ingredient,
  count = 0,
  onIngredientClick,
}: TIngredientCardProps): React.JSX.Element => {
  return (
    <li
      className={`${styles.card as string} pl-4 pr-4 `}
      onClick={() => onIngredientClick(ingredient)}
    >
      {count > 0 && (
        <Counter count={count} size="default" extraClass={styles.counter as string} />
      )}
      <img className="mb-1" src={ingredient.image} alt={ingredient.name} />
      <span className={`${styles.price as string} mb-1 text text_type_digits-default `}>
        {ingredient.price}
        <CurrencyIcon type="primary" />
      </span>
      <p className={` ${styles.name as string} text text_type_main-default mb-1 `}>
        {ingredient.name}
      </p>
    </li>
  );
};
