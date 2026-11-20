import { OrderList } from '@/components/order-list/order-list';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import { useGetProfileOrdersQuery } from '@services/api/burgerApi';

import styles from './profile-orders.module.css';

export const ProfileOrders = (): React.JSX.Element => {
  const { data: response, isLoading, isError, error } = useGetProfileOrdersQuery();
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
  const orders = response.orders;
  return (
    <div className={styles.orders}>
      <OrderList orders={orders} variant="profile" />
    </div>
  );
};
