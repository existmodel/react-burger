import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';

import { IngredientCard } from './../ingredients-card/ingredients-card';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState('bun');

  const buns = ingredients.filter((item) => item.type === 'bun');
  const sauces = ingredients.filter((item) => item.type === 'sauce');
  const mains = ingredients.filter((item) => item.type === 'main');

  const ingredientsRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (value: string): void => {
    setActiveTab(value);
    document.getElementById(value)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const container = ingredientsRef.current;
    if (!container) return;

    const handleScroll = (): void => {
      const containerTop = container.getBoundingClientRect().top;
      const headings = [...container.querySelectorAll('h2')];

      if (headings.length === 0) return;

      const closestHeading = headings.reduce((closest, next) => {
        const closestDist = Math.abs(closest.getBoundingClientRect().top - containerTop);
        const currentDist = Math.abs(next.getBoundingClientRect().top - containerTop);
        return currentDist < closestDist ? next : closest;
      });

      if (closestHeading && closestHeading.id !== activeTab) {
        setActiveTab(closestHeading.id);
      }
    };
    container.addEventListener('scroll', handleScroll);

    return (): void => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab]);

  const renderCategoryList = (list: TIngredient[]): React.JSX.Element[] => {
    return list.map((item) => <IngredientCard key={item._id} ingredient={item} />);
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav className="mb-10">
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={activeTab === 'bun'}
            onClick={() => {
              handleTabClick('bun');
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={activeTab === 'main'}
            onClick={() => {
              handleTabClick('main');
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={activeTab === 'sauce'}
            onClick={() => {
              handleTabClick('sauce');
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>

      <div
        ref={ingredientsRef}
        className={`${styles.ingredientsLists} custom-scroll mb-10 `}
      >
        <section className="mb-10">
          <h2 className="text text_type_main-medium mb-6" id="bun">
            Булки
          </h2>
          <ul className={`${styles.ingredientsList} mb-10 pl-4 pr-4 `}>
            {renderCategoryList(buns)}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text text_type_main-medium mb-6" id="main">
            Начинки
          </h2>
          <ul className={`${styles.ingredientsList}  pl-4 pr-4 `}>
            {renderCategoryList(mains)}
          </ul>
        </section>
        <section className="mb-10">
          <h2 className="text text_type_main-medium mb-6" id="sauce">
            Соусы
          </h2>
          <ul className={` ${styles.ingredientsList} mb-10 pl-4 pr-4 `}>
            {renderCategoryList(sauces)}
          </ul>
        </section>
      </div>
    </section>
  );
};
