import type { TOrder } from '@utils/types';

import styles from './order-stats.module.css';
type OrderListProps = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};
export const OrderStats = ({
  orders,
  total,
  totalToday,
}: OrderListProps): React.JSX.Element => {
  const doneOrders = orders.filter((item) => item.status === 'done').slice(0, 20);
  const donePending = orders.filter((item) => item.status === 'pending').slice(0, 20);

  const renderOrdersNumbers = (orders: TOrder[]): React.JSX.Element[] => {
    return orders.map((item) => (
      <li key={item._id} className="text text_type_digits-default">
        {item.number}
      </li>
    ));
  };
  return (
    <section className={`${styles.container} custom-scroll`}>
      {/* <div className={styles.columns}> */}
      <div className={`mr-9 ${styles.column}`}>
        <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
        <ul className={`${styles.list} ${styles.done}`}>
          {renderOrdersNumbers(doneOrders)}
        </ul>
      </div>
      <div className={styles.column}>
        <h2 className="text text_type_main-medium mb-6">В работе:</h2>
        <ul className={styles.list}>{renderOrdersNumbers(donePending)}</ul>
      </div>
      <div className={`mt-15 ${styles.total}`}>
        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
        <span className="text text_type_digits-large">{total}</span>
      </div>
      <div className={`mt-15 ${styles.today}`}>
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <span className="text text_type_digits-large">{totalToday}</span>
      </div>
      {/* </div> */}
    </section>
  );
};
