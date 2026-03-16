import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode';

export interface User {
  _id: string;
  userName: string;
  role: string;
  email?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
const token = localStorage.getItem("token");

const initialState: AuthState = {
  user: token ? jwtDecode<User>(token) : null,
  token: token||null,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string }>
    ) => {
      state.token = action.payload.token;
      state.user = jwtDecode<User>(action.payload.token);
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});
// Action creators are generated for each case reducer function
export const { setCredentials,logout } = authSlice.actions

export default authSlice.reducer