import { OrderList } from '@/components/order-list/order-list';
import { OrderStats } from '@/components/order-stats/order-stats';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import { useGetFeedQuery } from '@services/api/burgerApi';

import styles from './feed.module.css';

export const Feed = (): React.JSX.Element => {
  const { data: response, isLoading, isError, error } = useGetFeedQuery();
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
    <div className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Лента заказов
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <OrderList orders={orders} variant="feed" />
        <OrderStats
          orders={orders}
          total={response.total}
          totalToday={response.totalToday}
        />
      </main>
    </div>
  );
};
