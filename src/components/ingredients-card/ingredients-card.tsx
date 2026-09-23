import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

import { selectIngredientCount } from '@services/slices/constructorSlice';

import type { RootState } from '../../services/store';
import type { TIngredient } from '@utils/types';

import styles from './ingredients-card.module.css';

type TIngredientCardProps = {
  ingredient: TIngredient;

  onIngredientClick: (ingredient: TIngredient) => void;
};

export const IngredientCard = ({
  ingredient,
  onIngredientClick,
}: TIngredientCardProps): React.JSX.Element => {
  const count = useSelector((state: RootState) =>
    selectIngredientCount(state, ingredient)
  );
  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <li
      style={{ opacity: isDragging ? 0.4 : 1 }}
      className={`${styles.card as string} pl-4 pr-4 `}
      onClick={() => onIngredientClick(ingredient)}
      ref={(node) => {
        dragRef(node);
      }}
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
