import { Tab } from '@krgaa/react-developer-burger-ui-components';

import { IngredientCard } from './../ingredients-card/ingredients-card';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
  onIngredientClick: (ingredient: TIngredient) => void;
};

export const BurgerIngredients = ({
  ingredients,
  onIngredientClick,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const buns = ingredients.filter((item) => item.type === 'bun');
  const sauces = ingredients.filter((item) => item.type === 'sauce');
  const mains = ingredients.filter((item) => item.type === 'main');

  const renderCategoryList = (list: TIngredient[]): React.JSX.Element[] => {
    return list.map((item, index) => (
      <IngredientCard
        key={item._id}
        ingredient={item}
        count={index === 0 ? 1 : undefined} // заглушка для counter
        onIngredientClick={onIngredientClick}
      />
    ));
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav className="mb-10">
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>

      <div className={`${styles.ingredientsLists} custom-scroll mb-10 `}>
        <section className="mb-10">
          <h2 className="text text_type_main-medium mb-6">Булки</h2>
          <ul className={`${styles.ingredientsList} mb-10 pl-4 pr-4 `}>
            {renderCategoryList(buns)}
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="text text_type_main-medium mb-6">Соусы</h2>
          <ul className={` ${styles.ingredientsList} mb-10 pl-4 pr-4 `}>
            {renderCategoryList(sauces)}
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="text text_type_main-medium mb-6">Основа</h2>
          <ul className={`${styles.ingredientsList}  pl-4 pr-4 `}>
            {renderCategoryList(mains)}
          </ul>
        </section>
      </div>
    </section>
  );
};
