import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuth: !!localStorage.getItem("user"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    login(state, action) {
      const { email, password } = action.payload;

      const foundUser = state.users.find(
        u => u.email === email && u.password === password
      );

      if (foundUser) {
        state.user = foundUser;
        state.isAuth = true;
        localStorage.setItem("user", JSON.stringify(foundUser));
      }
    },

    register(state, action) {
      const newUser = action.payload;

      const exists = state.users.find(u => u.email === newUser.email);
      if (exists) return;

      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users));

      state.user = newUser;
      state.isAuth = true;
      localStorage.setItem("user", JSON.stringify(newUser));
    },

    logout(state) {
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem("user");
    },
  },
});

export const { login, register, logout } = authSlice.actions;
export default authSlice.reducer;
