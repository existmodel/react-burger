import {
  FormattedDate,
  CurrencyIcon,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';

import { OrderItem } from '@components/order-item/order-item';
import { useGetIngredientsQuery } from '@services/api/burgerApi';
import { ORDER_STATUS_TEXT } from '@utils/constants';
import {
  getOrderIngredients,
  getOrderIngredientsSummary,
  getOrderNumber,
  getGroupedOrderIngredients,
} from '@utils/order-utils';

import type { TOrder, TOrderIngredient } from '@utils/types';

import styles from './order-info.module.css';

type TOrderInfoProps = {
  order: TOrder;
};

export const OrderInfo = ({ order }: TOrderInfoProps): React.JSX.Element => {
  const { data: response, isLoading, isError, error } = useGetIngredientsQuery();
  if (isLoading || !response) {
    return <Preloader />;
  }
  const ingredients = response.data;
  const orderIngredients = getOrderIngredients(order.ingredients, ingredients);
  const orderSum = getOrderIngredientsSummary(orderIngredients);

  const orderNumber = getOrderNumber(order.number);

  if (isError || !response) {
    console.error('Ошибка при загрузке заказа:', error);
    return (
      <div className={styles.container}>
        <p className="text text_type_main-default pt-10 pl-10">
          Произошла ошибка при загрузке данных.
        </p>
      </div>
    );
  }

  const groupedOrderIngredients = getGroupedOrderIngredients(orderIngredients);

  const renderOrderItems = (
    orderIngredients: TOrderIngredient[]
  ): React.JSX.Element[] => {
    return orderIngredients.map((item) => (
      <OrderItem
        key={item.ingredient._id}
        ingredient={item.ingredient}
        count={item.count}
      />
    ));
  };

  return (
    <div className={`${styles.container} mb-15 mt-10`}>
      <div className={`mb-15 ${styles.header}`}>
        <p className={`text text_type_digits-default mb-10 ${styles.order}`}>
          #{orderNumber}
        </p>
        <h2 className="text text_type_main-medium mb-3">{order.name}</h2>
        <p className={`text text_type_main-small ${styles.status}`}>
          {ORDER_STATUS_TEXT[order.status]}
        </p>
      </div>
      <div>
        <div className="mb-10">
          <h3 className="text text_type_main-medium mb-6">Состав:</h3>
          <ul className={`custom-scroll mb-10 ${styles.list}`}>
            {renderOrderItems(groupedOrderIngredients)}
          </ul>
        </div>
        <div className={styles.bottom}>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
          <span className={`${styles.price} mb-1 text text_type_digits-default `}>
            {orderSum}
            <CurrencyIcon type="primary" />
          </span>
        </div>
      </div>
    </div>
  );
};
