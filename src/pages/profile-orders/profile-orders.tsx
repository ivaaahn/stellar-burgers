import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getMyOrdersThunk,
  selectProfileOrders
} from '../../services/slices/myOrders';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyOrdersThunk());
  }, []);

  const orders: TOrder[] = useSelector(selectProfileOrders);
  return <ProfileOrdersUI orders={orders} />;
};
