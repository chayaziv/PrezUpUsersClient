// import { createSlice } from "@reduxjs/toolkit";
// import { UserType } from "../types/user";

// const currentUserSlice = createSlice({
//   name: "currentUser",
//   initialState: { user: null as UserType | null },
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//     clearUser: (state) => {
//       state.user = null;
//     },
//   },
// });

// export const { setUser, clearUser } = currentUserSlice.actions;
// export default currentUserSlice;
import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../types/user";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: { 
    user: null as UserType | null,
    isLoggedIn: false, // משתנה חדש למעקב אחר מצב ההתחברות
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true; // כאשר המשתמש מתעדכן, נחשב אותו כמחובר
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false; // כאשר המשתמש מתנתק, נגדיר אותו כלא מחובר
    },
  },
});

export const { setUser, clearUser } = currentUserSlice.actions;
export default currentUserSlice;
