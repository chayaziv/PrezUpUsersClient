import { configureStore } from "@reduxjs/toolkit";
import myPresentationsSlice from "./slices/myPresentations";
import publicPresentationsSlice from "./slices/PublicPresentationsSlice";

import tagsSlice from "./slices/tagsSlice";
import currentUserSlice from "./slices/currentUserSlice";

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
