import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./demoCounterSlice";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
  applyMiddleware: [thunk],
});

export default store;
