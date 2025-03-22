import { configureStore } from "@reduxjs/toolkit";
import myPresentationsSlice from "./myPresentations";
import publicPresentationsSlice from "./PublicPresentationsSlice";
import currentUserSlice from "./currentUserSlice";
import tagsSlice from "./tagsSlice";

const store = configureStore({
  reducer: {
    myPresentations: myPresentationsSlice.reducer,
    publicPresentations: publicPresentationsSlice.reducer,
    currentUser: currentUserSlice.reducer,
    tags: tagsSlice.reducer,
  },
});

export type StoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
