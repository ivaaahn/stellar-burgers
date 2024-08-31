import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
}

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false
};

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/all',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { selectIngredients, selectIngredientsIsLoading } =
  ingredientsSlice.selectors;

export const ingredientsReducer = ingredientsSlice.reducer;
