import { getFeedsApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { userSlice } from 'src/services/slices/userSlice';

interface OrdersState {
  isLoading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: OrdersState = {
  isLoading: true,
  orders: [],
  total: 0,
  totalToday: 0
};

export const getFeedThunk = createAsyncThunk('orders/all', getFeedsApi);

export const feed = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders,
    selectIsLoading: (state) => state.isLoading,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const { selectOrders, selectTotal, selectTotalToday, selectIsLoading } =
  feed.selectors;

export const feedReducer = feed.reducer;
