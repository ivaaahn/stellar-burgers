import { TUser } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';

export const loginUserThunk = createAsyncThunk('user/login', loginUserApi);
export const registerUserThunk = createAsyncThunk(
  'user/register',
  registerUserApi
);
export const getUserThunk = createAsyncThunk('user/getuser', getUserApi);
export const updateUserThunk = createAsyncThunk('user/update', updateUserApi);
export const logoutUserThunk = createAsyncThunk('user/logout', logoutApi);

export enum UserStatus {
  NOT_AUTHORIZED = 'NOT_AUTHORIZED',
  LOGGED_IN = 'LOGGED_IN',
  CHECKING = 'CHECKING'
}

export interface TUserState {
  user: TUser;
  status: UserStatus;
  error: string | undefined;
}

const initialState: TUserState = {
  status: UserStatus.CHECKING,
  user: {
    email: '',
    name: ''
  },
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUser: (state: TUserState) => state.user,
    getUserStatus: (state: TUserState) => state.status,
    getUserError: (state: TUserState) => state.error,
    getName: (state: TUserState) => state.user.name
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.status = UserStatus.LOGGED_IN;
        state.user = action.payload.user;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.status = UserStatus.NOT_AUTHORIZED;
        state.error = action.error.message!;
      });
    builder
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.status = UserStatus.LOGGED_IN;
        state.user = action.payload.user;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.status = UserStatus.NOT_AUTHORIZED;
        state.error = action.error.message!;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.status = UserStatus.CHECKING;
        state.error = '';
      });
    builder
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.status = UserStatus.LOGGED_IN;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.error = action.error.message!;
        state.status = UserStatus.NOT_AUTHORIZED;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.error = '';
        state.status = UserStatus.CHECKING;
      });
    builder
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.status = UserStatus.LOGGED_IN;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.status = UserStatus.NOT_AUTHORIZED;
        state.error = action.error.message!;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.error = '';
        state.status = UserStatus.CHECKING;
      });
    builder
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.status = UserStatus.NOT_AUTHORIZED;
        state.error = '';
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(logoutUserThunk.pending, (state) => {
        state.status = UserStatus.CHECKING;
        state.error = '';
      });
  }
});

export const { getUser, getUserError, getUserStatus } = userSlice.selectors;
export const userReducer = userSlice.reducer;
