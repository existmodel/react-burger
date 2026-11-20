import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { useGetIngredientsQuery } from '@services/api/burgerApi';

import styles from './ingredient.module.css';

export const Ingredient = (): React.JSX.Element => {
  const { id } = useParams();

  const { data: response, isLoading, isError, error } = useGetIngredientsQuery();
  if (isLoading) {
    return <Preloader />;
  }
  if (isError || !response) {
    console.error('Ошибка при загрузке ингредиентов:', error);
    return (
      <div className={styles.container}>
        <p className="text text_type_main-default pt-10 pl-10">
          Произошла ошибка при загрузке данных.
        </p>
      </div>
    );
  }
  const ingredients = response.data;

  const ingredient = ingredients.find((item) => id === item._id);

  if (!ingredient) {
    return <p className="text text_type_main-medium">Ингредиент не найден</p>;
  }

  return <IngredientDetails ingredient={ingredient} />;
};
