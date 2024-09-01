import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { useDispatch, useSelector } from 'src/services/store';
import { useParams } from 'react-router-dom';
import { selectIngredients } from 'src/services/slices/ingredientsSlice';
import { TIngredientsWithCount } from 'src/components/order-info/type';
import { getFeedThunk, selectOrders } from 'src/services/slices/feed';
import { selectProfileOrders } from 'src/services/slices/myOrders';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const orders = useSelector(selectOrders);
  const ingredients = useSelector(selectIngredients);
  const order = orders.find((order) => String(order.number) === number);

  useEffect(() => {
    dispatch(getFeedThunk());
  }, []);

  const orderInfo = useMemo(() => {
    if (!order || !ingredients.length) {
      return null;
    }

    const date = new Date(order.createdAt);
    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...order,
      ingredientsInfo,
      date,
      total
    };
  }, [order, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
