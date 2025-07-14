import axios from 'axios';

const URL= '';

export const authenticatesSignup = async (data) => {
    try{
        return await axios.post(`${URL}/signup`, data);
    } catch(error){
        console.log('Error while calling signup api', error);
    }
}

export const authenticateLogin = async (data) => {
    try{
        const response = await axios.post(`${URL}/login`, data);
        return response;
    } catch(error){
        console.error(' Error while calling login API:', error.message);
        return null; 
    }
}

export const createRazorpayOrder = async (amount) => {
  try {
    const response = await axios.post(`${URL}/razorpay/order`, { amount });
    return response.data;
  } catch (error) {
    console.error('Error while creating Razorpay order', error);
    return null;
  }
};

export const getRazorpayKey = async () => {
  try {
    const response = await axios.get(`${URL}/razorpay/key`);
    return response.data.key;
  } catch (error) {
    console.error('Error fetching Razorpay key:', error);
    return null;
  }
};

