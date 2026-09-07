import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { OrderDetails } from '@components/order-details/order-details';
import getData from '@utils/api';
import { TEST_ORDER_ID } from '@utils/constants';

import { Modal } from './../modal/modal';

import type { TIngredient } from '@utils/types';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const [selectedIngredient, setSelectedIngredient] = useState<TIngredient | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [loading, setLoading] = useState(true);

  const handleOpenIngredientModal = (ingredient: TIngredient): void => {
    setSelectedIngredient(ingredient);
  };

  const handleOpenOrderModal = (): void => {
    setIsOrderModalOpen(true);
  };

  useEffect(() => {
    getData()
      .then((response) => setIngredients(response.data))
      .catch((error) => console.error('Ошибка при загрузке ингредиентов:', error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Preloader />;
  }
  const handleCloseIngredientModal = (): void => {
    setSelectedIngredient(null);
  };

  const handleCloseOrderModal = (): void => {
    setIsOrderModalOpen(false);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients
          ingredients={ingredients}
          onIngredientClick={handleOpenIngredientModal}
        />
        <BurgerConstructor
          ingredients={ingredients}
          onOrderModalClick={handleOpenOrderModal}
        />
      </main>
      {selectedIngredient && (
        <Modal onClose={handleCloseIngredientModal} title="Детали ингредиента">
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}

      {isOrderModalOpen && (
        <Modal onClose={handleCloseOrderModal}>
          <OrderDetails orderId={TEST_ORDER_ID} />
        </Modal>
      )}
    </div>
  );
};

export default App;
