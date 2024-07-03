import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { authApi } from '../../api/authApi';

interface AuthSliceState {
  jwtToken: string | undefined,
  isAuthenticated: boolean,
  tokenStatus: string,
  error: string | undefined,
}

const initialState: AuthSliceState = {
  jwtToken: localStorage.getItem('jwtToken') || undefined,
  isAuthenticated: !!localStorage.getItem('jwtToken'),
  tokenStatus: "idle",
  error: undefined,
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
      if (state.jwtToken) {
        state.isAuthenticated = true;
        localStorage.setItem('jwtToken', state.jwtToken);
      }
      console.log(state.isAuthenticated);
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
      if (state.jwtToken) {
        state.isAuthenticated = true;
        localStorage.setItem('jwtToken', state.jwtToken);
      }
    })
    .addCase(authApi.register.rejected, (state, action) => {
      state.tokenStatus = "failed";
      state.error = action.error.message;
    })
  }
});

// Selectors
export const selectJwtToken = (state: RootState) => state.auth.jwtToken;
export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer;
