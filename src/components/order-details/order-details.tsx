import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.css';

type OrderDetailsProps = {
  orderId: string;
};

export const OrderDetails = ({ orderId }: OrderDetailsProps): React.JSX.Element => {
  return (
    <div className={`${styles.container} mt-10 `}>
      <p className="text text_type_digits-large mb-8">{orderId}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>

      <div className={`${styles.iconWrapper} mb-15 `}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
