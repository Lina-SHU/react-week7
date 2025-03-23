import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./slice/toastSlice";
import loadingReducer from "./slice/loadingSlice";

export const store = configureStore({
  reducer: { // 必要加入 reducer
    toast: toastReducer,
    loading: loadingReducer
  }
});