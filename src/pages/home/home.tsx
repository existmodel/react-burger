// import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import { clearConstructor } from '@services/slices/constructorSlice';
import { closeOrderModal } from '@services/slices/ingredientsSlice';
import { useAppDispatch, useAppSelector } from '@services/storeHooks';

import styles from './home.module.css';

export const Home = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const isOrderModalOpen = useAppSelector((state) => state.ingredients.isOrderModalOpen);

  const handleCloseOrderModal = (): void => {
    dispatch(closeOrderModal());
    dispatch(clearConstructor());
  };

  const orderNumber = useAppSelector((state) => state.ingredients.orderNumber);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.container}>
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
          Соберите бургер
        </h1>
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>

        {isOrderModalOpen && orderNumber && (
          <Modal onClose={handleCloseOrderModal}>
            <OrderDetails orderId={String(orderNumber)} />
          </Modal>
        )}
      </div>
    </DndProvider>
  );
};
