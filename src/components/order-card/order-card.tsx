import {
  FormattedDate,
  CurrencyIcon,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

import { useGetIngredientsQuery } from '@services/api/burgerApi';
import { ORDER_STATUS_TEXT } from '@utils/constants';
import {
  getOrderIngredients,
  getOrderIngredientsSummary,
  getOrderNumber,
} from '@utils/order-utils';

import type { TIngredient, TOrder } from '@utils/types';

import styles from './order-card.module.css';

type TOrderCardProps = {
  order: TOrder;
  variant: 'profile' | 'feed';
};

export const OrderCard = ({ order, variant }: TOrderCardProps): React.JSX.Element => {
  const location = useLocation();

  const { data: response, isLoading, isError, error } = useGetIngredientsQuery();
  if (isLoading || !response) {
    return <Preloader />;
  }

  if (isError || !response) {
    console.error('Ошибка при загрузке заказа:', error);
    return (
      <p className="text text_type_main-default pt-10 pl-10">
        Произошла ошибка при загрузке данных.
      </p>
    );
  }

  const ingredients = response.data;

  const orderIngredients = getOrderIngredients(order.ingredients, ingredients);

  const orderSum = getOrderIngredientsSummary(orderIngredients);

  const orderNumber = getOrderNumber(order.number);

  const renderOrderIconsImage = (list: TIngredient[]): React.JSX.Element[] => {
    const remainder = list.length - 6;
    list = list.slice(0, 6);

    return list.map((item, index) => (
      <li key={`${item._id}-${index}`} className={styles.item}>
        <img src={item.image_mobile} alt={item.name} className={styles.icon} />
        {remainder > 0 && index === list.length - 1 && (
          <span className={styles.count}>+{remainder}</span>
        )}
      </li>
    ));
  };

  const orderPath = variant === 'profile' ? '/profile/orders' : '/feed';

  return (
    <li className={styles.card}>
      <Link
        to={`${orderPath}/${order.number}`}
        state={{ backgroundLocation: location }}
        className={`${styles.link} text_color_primary`}
      >
        <header className={styles.header}>
          <p className="text text_type_digits-default">#{orderNumber}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
        </header>
        <h2
          className={`text text_type_main-medium mt-6 ${variant === 'profile' ? 'mb-2' : 'mb-6'}`}
        >
          {order.name}
        </h2>
        {variant === 'profile' && (
          <span
            className={`text text_type_main-default mb-6 ${order.status === 'done' ? styles.done : ''}`}
          >
            {ORDER_STATUS_TEXT[order.status]}
          </span>
        )}
        <div className={styles.info}>
          <ul className={styles.list}>{renderOrderIconsImage(orderIngredients)}</ul>

          <span className={`${styles.price} mb-1 text text_type_digits-default `}>
            {orderSum}
            <CurrencyIcon type="primary" />
          </span>
        </div>
      </Link>
    </li>
  );
};
