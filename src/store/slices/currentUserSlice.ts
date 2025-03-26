import { createSlice } from "@reduxjs/toolkit";
import { initialUserState, UserType } from "@/types/user";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    user: initialUserState as UserType,
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.user = initialUserState;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = currentUserSlice.actions;
export default currentUserSlice;
