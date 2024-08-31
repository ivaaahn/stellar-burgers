import {Preloader} from '@ui';
import {FeedUI} from '@ui-pages';
import {TOrder} from '@utils-types';
import {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "src/services/store";
import {getFeedThunk, selectOrders} from "src/services/slices/feed";

export const Feed: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFeedThunk())
  }, [])

  const orders: TOrder[] = useSelector(selectOrders)
  if (!orders.length) {
    return <Preloader/>;
  }

  return <FeedUI
    orders={orders}
    handleGetFeeds={() => {
      dispatch(getFeedThunk())
    }}/>;
};
