const axios = require('axios');

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_URL = 'https://api.paystack.co';

const paystackApi = axios.create({
  baseURL: PAYSTACK_URL,
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET}`,
    'Content-Type': 'application/json',
  },
});

const initializePayment = async (data) => {
  const response = await paystackApi.post('/transaction/initialize', data);
  return response.data;
};

const verifyPayment = async (reference) => {
  const response = await paystackApi.get(`/transaction/verify/${reference}`);
  return response.data;
};

module.exports = { initializePayment, verifyPayment };