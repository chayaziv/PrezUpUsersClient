import { configureStore } from "@reduxjs/toolkit";
import myPresentationsSlice from "./myPresentations";
import publicPresentationsSlice from "./PublicPresentationsSlice";
import currentUserSlice from "./currentUserSlice";

const store = configureStore({
  reducer: {
    myPresentations: myPresentationsSlice.reducer,
    publicPresentations: publicPresentationsSlice.reducer,
    currentUser: currentUserSlice.reducer,
  },
});

export type StoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
