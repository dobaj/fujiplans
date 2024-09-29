import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./features/tokenSlice";
import userReducer from "./features/userSlice";

// Create the store
export const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
  },
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;

export default store;
