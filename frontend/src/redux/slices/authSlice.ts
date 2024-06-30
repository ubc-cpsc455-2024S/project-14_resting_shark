import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { authApi } from '../../api/authApi';

interface AuthSliceState {
  jwtToken: string | undefined,
  tokenStatus: string,
  error: string | undefined,
}

const initialState: AuthSliceState = {
  jwtToken: "",
  tokenStatus: "idle",
  error: "",
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // LOGIN-------------------------------
    .addCase(authApi.login.pending, (state) => {
      state.tokenStatus = "loading";
    })
    .addCase(authApi.login.fulfilled, (state, action) => {
      state.tokenStatus = "suceeded";
      state.jwtToken = action.payload.token;
    })
    .addCase(authApi.login.rejected, (state, action) => {
      state.tokenStatus = "failed";
      state.error = action.error.message;
    })

    // REGISTER ---------------------------------
    .addCase(authApi.register.pending, (state) => {
      state.tokenStatus = "loading";
    })
    .addCase(authApi.register.fulfilled, (state, action) => {
      state.tokenStatus = "suceeded";
      state.jwtToken = action.payload.token;
    })
    .addCase(authApi.register.rejected, (state, action) => {
      state.tokenStatus = "failed";
      state.error = action.error.message;
    })
  }
});

// Selectors
export const selectJwtToken = (state: RootState) => state.auth.jwtToken;
export const isUserLoggedIn = (state: RootState) => state.auth.jwtToken == undefined;

export default authSlice.reducer;
