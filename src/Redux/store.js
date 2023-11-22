import { configureStore } from "@reduxjs/toolkit";
import motorcycleReducer from "./Reducers/motorcycleSlice";
import serviceReducer from "./Reducers/serviceSlice";
import authReducer from "./Reducers/authSlice";
import orderReducer from "./Reducers/orderSlice";
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    motorcycles: motorcycleReducer,
    services: serviceReducer,
    auth: authReducer,
    order: orderReducer,
  },
  middleware: [thunk]
});

export default store;
