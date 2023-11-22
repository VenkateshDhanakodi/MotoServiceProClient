import { setSelectedServices, setCustomerDetails, setTotalAmount } from '../orderSlice';
import { createAsyncThunk } from "@reduxjs/toolkit";

// Async action using Redux Thunk
export const updateOrderDetailsAsync = createAsyncThunk(
  'order/updateOrderDetailsAsync',
  async (orderDetails, { dispatch }) => {
    try {
      const { selectedServiceItems = [] } = orderDetails; // Ensuring selectedServiceItems is an array

      // Dispatching actions to update order details in the order slice redux
      dispatch(setSelectedServices(selectedServiceItems));
      dispatch(setCustomerDetails(orderDetails.customerDetails));

      // Calculating and dispatch the total amount based on the selected services
      const totalAmount = selectedServiceItems.reduce((total, service) => {
        return total + (service.selected ? service.item.price : 0);
      }, 0);
      dispatch(setTotalAmount(totalAmount));
    } catch (error) {
      console.error('Error updating order details:', error.message);
    }
  }
);

export default {
  updateOrderDetailsAsync
};
