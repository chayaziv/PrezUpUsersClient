import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/user";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: { user: null as UserType | null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = currentUserSlice.actions;
export default currentUserSlice;
