import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
  loading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    fetchServicesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchServicesSuccess: (state, action) => {
      state.loading = false;
      state.services = action.payload;
      state.error = null;
    },
    fetchServicesFailure: (state, action) => {
      state.loading = false;
      state.services = [];
      state.error = action.payload;
    },
  },
});

export const {
  fetchServicesRequest,
  fetchServicesSuccess,
  fetchServicesFailure,
} = serviceSlice.actions;

export default serviceSlice.reducer;
