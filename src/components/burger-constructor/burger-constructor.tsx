import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { BurgerConstructorItem } from '@components/burger-constructor-item/burger-constructor-item';
import { usePostOrderMutation } from '@services/api/burgerApi';
import { selectUser } from '@services/slices/authSlice';
import {
  addIngredient,
  selectTotalPrice,
  clearConstructor,
} from '@services/slices/constructorSlice';
import { openOrderModal, setOrderNumber } from '@services/slices/ingredientsSlice';
import { useAppDispatch, useAppSelector } from '@services/storeHooks';

import type { TConstructorIngredient, TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [postOrder, { isLoading }] = usePostOrderMutation();

  const summary = useAppSelector(selectTotalPrice);

  const { bun, fillings } = useAppSelector((state) => state.burgerConstructor);

  const handleOrderClick = async (): Promise<void> => {
    if (!bun) return;

    if (!user) {
      void navigate('/login');
      return;
    }

    const { _id } = bun;

    const fillingsId = fillings.map((item: TConstructorIngredient) => item._id);

    const allId = [_id, ...fillingsId, _id];
    try {
      const response = await postOrder(allId).unwrap();

      dispatch(setOrderNumber(response.order.number));
      dispatch(openOrderModal());
      dispatch(clearConstructor());
    } catch (error) {
      console.log('Ошибка при создании заказа', error);
    }
  };

  const renderFillingsList = (): React.JSX.Element[] => {
    return fillings.map((item, index) => (
      <BurgerConstructorItem key={item.id} item={item} index={index} />
    ));
  };

  const [{ isOver, draggedItem }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredient) {
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      draggedItem: monitor.getItem(),
    }),
  });

  const isBunHover = isOver && draggedItem?.type === 'bun';
  const isFillingHover = isOver && draggedItem?.type !== 'bun';

  return (
    <section
      className={styles.burger_constructor}
      ref={(node) => {
        dropTarget(node);
      }}
    >
      <div className="ml-8 mb-4">
        {bun ? (
          <ConstructorElement
            isLocked
            price={bun.price}
            text={`${bun.name} (верх)`}
            thumbnail={bun.image}
            type="top"
          />
        ) : (
          <div
            className={`${styles.stub} ${styles.stubTop} ${isBunHover ? styles.stubHover : ''}`}
          >
            <p className="text text_type_main-default">Выберите булки</p>
          </div>
        )}
      </div>
      <ul
        className={`custom-scroll ${styles.fillingList} ${
          fillings.length === 0 ? styles.fillingListEmpty : ''
        }`}
      >
        {fillings.length > 0 ? (
          renderFillingsList()
        ) : (
          <li
            className={`ml-8 ${styles.stub} ${styles.stubMiddle} ${isFillingHover ? styles.stubHover : ''}`}
          >
            <p className="text text_type_main-default">Выберите начинку</p>
          </li>
        )}
      </ul>

      <div className="ml-8 mb-10 mt-4">
        {bun ? (
          <ConstructorElement
            isLocked
            price={bun.price}
            text={`${bun.name} (низ)`}
            thumbnail={bun.image}
            type="bottom"
          />
        ) : (
          <div
            className={`${styles.stub} ${styles.stubBottom} ${isBunHover ? styles.stubHover : ''}`}
          >
            <p className="text text_type_main-default ">Выберите булки</p>
          </div>
        )}
      </div>

      <div className={styles.burgerConstructorBottom}>
        <div className={`${styles.totalPrice} mr-10`}>
          <span className="text text_type_digits-medium">{summary}</span>
          <CurrencyIcon type="primary" />
        </div>

        <Button
          size="large"
          type="primary"
          htmlType="button"
          disabled={isLoading || !bun}
          onClick={() => {
            void handleOrderClick();
          }}
        >
          {isLoading ? 'Оформляем заказ...' : 'Оформить заказ'}
        </Button>
      </div>
    </section>
  );
};
