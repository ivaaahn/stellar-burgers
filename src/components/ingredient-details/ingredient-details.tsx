import {FC} from 'react';
import {Preloader} from '../ui/preloader';
import {IngredientDetailsUI} from '../ui/ingredient-details';
import {selectIngredients} from "src/services/slices/ingredientsSlice";
import {useParams} from "react-router-dom";
import {useSelector} from "src/services/store";

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(selectIngredients);
  const {id} = useParams();

  const ingredient = ingredients.find((ingredient) => ingredient._id === id);
  if (!ingredient) {
    return <Preloader/>;
  }

  return <IngredientDetailsUI ingredientData={ingredient}/>;
};
