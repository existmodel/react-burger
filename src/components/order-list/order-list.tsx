import { OrderCard } from '../order-card/order-card';

import type { TOrder } from '@utils/types';

import styles from './order-list.module.css';

type OrderListProps = {
  orders: TOrder[];
  variant: 'profile' | 'feed';
};

export const OrderList = ({ orders, variant }: OrderListProps): React.JSX.Element => {
  const renderOrderList = (orders: TOrder[]): React.JSX.Element[] => {
    return orders.map((item) => (
      <OrderCard key={item._id} order={item} variant={variant} />
    ));
  };

  return (
    <section className={`${styles.container} custom-scroll`}>
      <ul className={`${styles.list} custom-scroll`}>{renderOrderList(orders)}</ul>
    </section>
  );
};
