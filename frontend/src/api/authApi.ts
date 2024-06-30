import { createAsyncThunk } from '@reduxjs/toolkit';
import { requests } from "./requestTemplate";

interface CredentialArgs {
  username?: string,
  password?: string,
}

const login = createAsyncThunk('login', async (args: CredentialArgs) => {
  const response = await requests.postRequest(
    "",
    "/auth/login",
  {
    username: args.username,
    password: args.password,
  });

  return response;
});


const register = createAsyncThunk('register', async(args: CredentialArgs) => {
  const response = await requests.postRequest(
    "",
    "/auth/register",
    {
      username: args.username,
      password: args.password,
    });

  return response;
});

export const authApi = {
  login,
  register,
};
