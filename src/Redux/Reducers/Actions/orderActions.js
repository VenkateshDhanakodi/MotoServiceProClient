import { setSelectedServices, setCustomerDetails, setTotalAmount } from '../orderSlice';
import { createAsyncThunk } from "@reduxjs/toolkit";

// Async action using Redux Thunk
export const updateOrderDetailsAsync = createAsyncThunk(
  'order/updateOrderDetailsAsync',
  async (orderDetails, { dispatch }) => {
    try {
      const { selectedServiceItems = [] } = orderDetails; // Ensure selectedServiceItems is an array

      // Dispatch actions to update order details in the order slice redux
      dispatch(setSelectedServices(selectedServiceItems));
      dispatch(setCustomerDetails(orderDetails.customerDetails));

      // Calculate and dispatch the total amount based on the selected services
      const totalAmount = selectedServiceItems.reduce((total, service) => {
        return total + (service.selected ? service.item.price : 0);
      }, 0);
      dispatch(setTotalAmount(totalAmount));
    } catch (error) {
      // Handle errors if needed
      console.error('Error updating order details:', error.message);
    }
  }
);

// Other action creators or constants can be added here if needed

export default {
  updateOrderDetailsAsync,
  // Add other exports here if needed
};
