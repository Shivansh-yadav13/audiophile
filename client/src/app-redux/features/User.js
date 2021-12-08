import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      sessionStorage.clear();
      state.user = null;
    },
  },
});

export const { loadUser, logout } = userSlice.actions;

export default userSlice.reducer;
