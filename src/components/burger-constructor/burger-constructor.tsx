import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
  onOrderModalClick: () => void;
};

export const BurgerConstructor = ({
  ingredients,
  onOrderModalClick,
}: TBurgerConstructorProps): React.JSX.Element => {
  const bun = ingredients.find((item) => item.type === 'bun');
  const fillings = ingredients.filter((item) => item.type !== 'bun');

  const renderFillingsList = (list: TIngredient[]): React.JSX.Element[] => {
    return list.map((item) => (
      <li className={`${styles.fillingsItem} mb-4`} key={item._id}>
        <DragIcon type="primary" />
        <ConstructorElement
          handleClose={() => {
            {
              /*заглушка для удаления*/
            }
          }}
          price={item.price}
          text={item.name}
          thumbnail={item.image}
        />
      </li>
    ));
  };

  return (
    <section className={styles.burger_constructor}>
      <div className="ml-8 mb-4">
        {bun && (
          <ConstructorElement
            isLocked
            price={bun.price}
            text={`${bun.name} (верх)`}
            thumbnail={bun.image}
            type="top"
          />
        )}
      </div>
      <ul className={`custom-scroll ${styles.fillingList}`}>
        {renderFillingsList(fillings)}
      </ul>
      <div className="ml-8 mb-10">
        {bun && (
          <ConstructorElement
            isLocked
            price={bun.price}
            text={`${bun.name} (низ)`}
            thumbnail={bun.image}
            type="bottom"
          />
        )}
      </div>
      <div className={styles.burgerConstructorBottom}>
        <div className={`${styles.totalPrice} mr-10`}>
          <span className="text text_type_digits-medium">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          size="large"
          type="primary"
          htmlType="button"
          onClick={onOrderModalClick}
        >
          Нажми на меня
        </Button>
      </div>
    </section>
  );
};
