import { orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { v4 as uuid4 } from 'uuid';
import { ingredientsSlice } from 'src/services/slices/ingredientsSlice';

interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  createOrderError: SerializedError | null;
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  createOrderError: null
};

export const createOrderThunk = createAsyncThunk('orders/new', orderBurgerApi);

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') {
        state.bun = { ...action.payload, id: uuid4() };
      } else {
        state.ingredients.push({ ...action.payload, id: uuid4() });
      }
    },
    removeIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    swapLeft(state, action: PayloadAction<number>) {
      const tmp = state.ingredients[action.payload];
      state.ingredients[action.payload] = state.ingredients[action.payload - 1];
      state.ingredients[action.payload - 1] = tmp;
    },
    swapRight(state, action: PayloadAction<number>) {
      const tmp = state.ingredients[action.payload];
      state.ingredients[action.payload] = state.ingredients[action.payload + 1];
      state.ingredients[action.payload + 1] = tmp;
    },
    closeOrder(state) {
      state.orderModalData = null;
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    selectConstructorBun: (state) => state.bun,
    selectConstructorIngredients: (state) => state.ingredients,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrderThunk.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = null;
        state.createOrderError = action.error;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  swapLeft,
  swapRight,
  closeOrder
} = constructorSlice.actions;

export const {
  selectConstructorBun,
  selectConstructorIngredients,
  selectOrderRequest,
  selectOrderModalData
} = constructorSlice.selectors;

export const constructorReducer = constructorSlice.reducer;
