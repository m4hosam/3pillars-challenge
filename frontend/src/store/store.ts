import { configureStore } from "@reduxjs/toolkit";
import addressBookReducer from "./slices/addressBookSlice";

export const store = configureStore({
  reducer: {
    addressBook: addressBookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
