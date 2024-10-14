import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  role: "role1" | "role2" | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ role: "role1" | "role2" }>) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
