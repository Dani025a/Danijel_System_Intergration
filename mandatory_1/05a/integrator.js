const axios = require('axios');

async function registerWebhook(eventType, endpoint) {
  try {
    const response = await axios.post('http://localhost:3000/webhooks/register', {
      eventType,
      endpoint
    });
    console.log(response.data.message);
  } catch (error) {
    console.error('Failed to register webhook:', error.message);
  }
}

async function unregisterWebhook(endpoint) {
  try {
    const response = await axios.post('http://localhost:3000/webhooks/unregister', {
      endpoint
    });
    console.log(response.data.message);
  } catch (error) {
    console.error('Failed to unregister webhook:', error.message);
  }
}

async function pingEvent() {
  try {
    const response = await axios.post('http://localhost:3000/ping');
    console.log(response.data.message);
  } catch (error) {
    console.error('Failed to send ping event:', error.message);
  }
}

setTimeout(async () => {
  await registerWebhook('payment_received', 'http://localhost:3000/payment_received');
  await registerWebhook('payment_processed', 'http://localhost:3000/payment_processed');
  
  await pingEvent();
  
  await registerWebhook('payment_received', 'http://localhost:3000/payment_received');
  await registerWebhook('payment_processed', 'http://localhost:3000/payment_processed');
  
  await pingEvent();
  
  await unregisterWebhook('http://localhost:3000/payment_received');
  await unregisterWebhook('http://localhost:3000/payment_processed');
}, 2000);
