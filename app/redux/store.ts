import { configureStore } from "@reduxjs/toolkit";

// Slice Reducers >>
import userReducer from "./auth/userSlice";
import wishListReducer from "./wishList/wishListSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      wishList: wishListReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
