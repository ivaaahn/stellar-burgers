import {FC, useMemo} from 'react';
import {TConstructorIngredient} from '@utils-types';
import {BurgerConstructorUI} from '@ui';
import {useDispatch, useSelector} from '../../services/store';
import {
  closeOrder,
  createOrderThunk,
  selectConstructorBun,
  selectConstructorIngredients,
  selectOrderModalData,
  selectOrderRequest
} from '../../services/slices/constructorSlice';
import {useNavigate} from 'react-router-dom';
import {getUserStatus, UserStatus} from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = {
    bun: useSelector(selectConstructorBun),
    ingredients: useSelector(selectConstructorIngredients)
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const userStatus = useSelector(getUserStatus);

  const onOrderClick = () => {
    if (userStatus != UserStatus.LOGGED_IN) {
      navigate('/login');
    }

    if (!constructorItems.bun || orderRequest) {
      return;
    }

    dispatch(createOrderThunk(constructorItems.ingredients.map((ingredient) => ingredient._id)));
  };

  const closeOrderModal = () => {
    dispatch(closeOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
