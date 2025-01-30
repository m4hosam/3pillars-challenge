import { configureStore } from "@reduxjs/toolkit";
import addressBookReducer from "./slices/addressBookSlice";
import jobReducer from "./slices/jobsSlice";
import departmentReducer from "./slices/departmentsSlice";

export const store = configureStore({
  reducer: {
    addressBook: addressBookReducer,
    jobs: jobReducer,
    departments: departmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
