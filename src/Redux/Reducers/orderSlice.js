import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedServices: [],
  customerDetails: {
    name: "",
    address: {
      street: "",
      apartment: "",
      city: "",
      zipCode: "",
    },
    complaints: "",
  },
  totalAmount: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedServices: (state, action) => {
      state.selectedServices = action.payload;
    },
    setCustomerDetails: (state, action) => {
      state.customerDetails = { ...state.customerDetails, ...action.payload };
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    clearOrder: (state) => {
      state.selectedServices = [];
      state.customerDetails = {
        name: "",
        address: {
          street: "",
          apartment: "",
          city: "",
          zipCode: "",
        },
        complaints: "",
      };
      state.totalAmount = 0;
    },
  },
});

export const {
  setSelectedServices,
  setCustomerDetails,
  setTotalAmount,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
