import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateOrderDetailsAsync } from '../../Redux/Reducers/Actions/orderActions';

const Checkout = ({ orderDetails }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      dispatch(updateOrderDetailsAsync(orderDetails));
      // dispatch(setCustomerDetails(orderDetails.customerDetails));
      // dispatch(setSelectedServices(localSelectedServices));
      // dispatch(setTotalAmount(localTotalAmount));
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <Button type="submit" disabled={!stripe}>
          Pay
        </Button>
      </form>
    </Container>
  );
};

export default Checkout;
