// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userName: '',
  token: '',
};

// Function to initialize state from local storage
const initializeStateFromLocalStorage = () => {
  const storedData = localStorage.getItem('authData');
  if (storedData) {
    const { userName, token } = JSON.parse(storedData);
    return { isAuthenticated: true, userName, token };
  }
  return initialState;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initializeStateFromLocalStorage(), // Initialize from local storage
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.userName = action.payload.userName;
      state.token = action.payload.token;
      // Save authentication data to local storage
      localStorage.setItem('authData', JSON.stringify(action.payload));
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.userName = '';
      state.token = '';
      // Clear authentication data from local storage
      localStorage.removeItem('authData');
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
