import { createAsyncThunk } from '@reduxjs/toolkit';
import { requests } from "./requestTemplate";

interface CredentialArgsReg {
  name?: string;
  email?: string;
  username?: string,
  password?: string,
}

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


const register = createAsyncThunk('register', async(args: CredentialArgsReg) => {
  const response = await requests.postRequest(
    "",
    "/auth/register",
    {
      name: args.name,
      email: args.email,
      username: args.username,
      password: args.password,
    });

  return response;
});

export const authApi = {
  login,
  register,
};
