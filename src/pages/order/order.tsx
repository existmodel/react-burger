import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';

import { OrderInfo } from '@components/order-info/order-info';
import { burgerApi, useGetOrderByNumberQuery } from '@services/api/burgerApi';
import { useAppSelector } from '@services/storeHooks';

import styles from './order.module.css';

const selectFeed = burgerApi.endpoints.getFeed.select(undefined);
const selectProfileOrders = burgerApi.endpoints.getProfileOrders.select(undefined);

export const Order = (): React.JSX.Element => {
  const { id } = useParams();
  const orderNumber = Number(id);

  const feed = useAppSelector(selectFeed);
  const profileOrders = useAppSelector(selectProfileOrders);
  const feedOrders = feed.data ? feed.data.orders : [];
  const profileOrdersList = profileOrders.data ? profileOrders.data.orders : [];

  const cachedOrder = [...feedOrders, ...profileOrdersList].find(
    (item) => item.number === orderNumber
  );

  const {
    data: fetchedOrder,
    isLoading,
    isError,
    error,
  } = useGetOrderByNumberQuery(orderNumber, { skip: Boolean(cachedOrder) });

  if (isLoading) {
    return <Preloader />;
  }

  if (isError) {
    console.error('Ошибка при загрузке заказа:', error);
    return (
      <p className="text text_type_main-default pt-10 pl-10">
        Произошла ошибка при загрузке данных.
      </p>
    );
  }

  const order = cachedOrder ?? fetchedOrder;

  if (!order) {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-medium">Заказ не найден</p>
      </div>
    );
  }

  return <OrderInfo order={order} />;
};
