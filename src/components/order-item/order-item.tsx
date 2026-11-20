import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types';

import styles from './order-item.module.css';

type TOrderItemProps = {
  ingredient: TIngredient;
  count: number;
};
export const OrderItem = ({ ingredient, count }: TOrderItemProps): React.JSX.Element => {
  return (
    <li className={styles.item}>
      <div className={styles.border}>
        <img
          src={ingredient.image_mobile}
          alt={ingredient.name}
          className={styles.icon}
        />
      </div>
      <p className={`ml-4 text text_type_main-default ${styles.name}`}>
        {ingredient.name}
      </p>
      <div className={`text text_type_digits-default ${styles.value}`}>
        <span className="mr-2">{count}</span>
        <span className="mr-2">x</span>
        <span className={`${styles.price} mb-1`}>
          {ingredient.price}
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </li>
  );
};
