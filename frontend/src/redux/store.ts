import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slices/tokenSlice";
import userReducer from "./slices/userSlice";

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
