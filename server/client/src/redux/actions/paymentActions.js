import axios from 'axios';
import {
  PAYMENT_REQUEST, 
  PAYMENT_SUCCESS,
  PAYMENT_FAIL
} from '../constants/paymentConstants';

const URL = '';

export const verifyPayment = (paymentData) => async (dispatch) => {
  try {
    dispatch({ type: PAYMENT_REQUEST });

    const { data } = await axios.post(`${URL}/razorpay/verify`, paymentData);

    dispatch({ type: PAYMENT_SUCCESS, payload: data });
    alert(" Payment verified successfully!");

  } catch (error) {
    console.error(" Payment verification failed:", error.response?.data || error.message);

    dispatch({
      type: PAYMENT_FAIL,
      payload: error.response?.data?.message || "Payment verification failed"
    });

    alert(" Payment Failed! Signature mismatch or backend error.");

  }
};
