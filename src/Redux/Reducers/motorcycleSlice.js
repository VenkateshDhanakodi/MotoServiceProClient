import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brands: [],
    selectedBrand: null,
    models: [],
    motorcycles: [],
    loading: false,
    error: null,
  };
  

const motorcycleSlice = createSlice({
  name: "motorcycles",
  initialState,
  reducers: {
    fetchMotorcyclesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMotorcyclesSuccess: (state, action) => {
        state.loading = false;
        state.motorcycles = action.payload;
        state.error = null;
      },      
    fetchMotorcyclesFailure: (state, action) => {
      state.loading = false;
      state.motorcycles = [];
      state.error = action.payload;
    },
    fetchBrandsSuccess: (state, action) => {
      state.brands = action.payload;
    },
    fetchModelsSuccess: (state, action) => {
      state.models = action.payload;
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
    setModels: (state, action) => {
        state.models = action.payload;
      }  
  },
});

export const {
  fetchMotorcyclesRequest,
  fetchMotorcyclesSuccess,
  fetchMotorcyclesFailure,
  fetchBrandsSuccess,
  fetchModelsSuccess,
  setSelectedBrand,
  setModels 
} = motorcycleSlice.actions;

export default motorcycleSlice.reducer;
