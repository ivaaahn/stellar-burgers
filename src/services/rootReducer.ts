import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { constructorReducer } from './slices/constructorSlice';
import { feedReducer } from './slices/feed';
import { myOrdersReducer } from './slices/myOrders';

export const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feed: feedReducer,
  myOrders: myOrdersReducer
});
