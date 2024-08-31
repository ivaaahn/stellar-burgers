import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { feed } from 'src/services/slices/feed';

interface myOrdersState {
  isLoading: boolean;
  orders: TOrder[];
}

const initialState: myOrdersState = {
  isLoading: false,
  orders: []
};

export const getMyOrdersThunk = createAsyncThunk(
  'orders/profile',
  getOrdersApi
);

export const myOrdersSlice = createSlice({
  name: 'myOrders',
  initialState,
  reducers: {},
  selectors: {
    selectProfileOrders: (state) => state.orders,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getMyOrdersThunk.pending, (state) => {
        state.isLoading = true;
      });
  }
});

export const { selectProfileOrders, selectIsLoading } = myOrdersSlice.selectors;

export const myOrdersReducer = myOrdersSlice.reducer;
