import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

import { selectIngredientCount } from '@services/slices/constructorSlice';
import { useAppSelector } from '@services/storeHooks';

import type { TIngredient } from '@utils/types';

import styles from './ingredients-card.module.css';

type TIngredientCardProps = {
  ingredient: TIngredient;
};

export const IngredientCard = ({
  ingredient,
}: TIngredientCardProps): React.JSX.Element => {
  const count = useAppSelector((state) => selectIngredientCount(state, ingredient));
  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const location = useLocation();
  return (
    <li
      style={{ opacity: isDragging ? 0.4 : 1 }}
      className={`${styles.card} pl-4 pr-4 `}
      ref={(node) => {
        dragRef(node);
      }}
    >
      {count > 0 && <Counter count={count} size="default" extraClass={styles.counter} />}

      <Link
        to={`/ingredients/${ingredient._id}`}
        state={{ backgroundLocation: location }}
        draggable={false}
        className={`${styles.link} text_color_primary`}
      >
        <img className="mb-1" src={ingredient.image} alt={ingredient.name} />
        <span className={`${styles.price} mb-1 text text_type_digits-default `}>
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </span>
        <p className={` ${styles.name} text text_type_main-default mb-1 `}>
          {ingredient.name}
        </p>
      </Link>
    </li>
  );
};
