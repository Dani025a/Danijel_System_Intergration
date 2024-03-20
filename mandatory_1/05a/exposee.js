const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const db = new sqlite3.Database('mydatabase.db');

app.use(bodyParser.json());

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS webhooks (id INTEGER PRIMARY KEY AUTOINCREMENT, eventType TEXT, endpoint TEXT)");
});

process.on('exit', () => {
  db.close();
  console.log("Database connection closed.");
});

db.on('error', (error) => {
  console.error("Error occurred in database:", error.message);
});

/**
 * Endpoint to handle payment received event.
 * @method POST
 * @endpoint /payment_received
 * @returns {object} Response object with message indicating success.
 */
app.post('/payment_received', (req, res) => {
  console.log('Received payment_received event.');
  res.status(200).send('Payment received event handled successfully.');
});

/**
 * Endpoint to handle payment processed event.
 * @method POST
 * @endpoint /payment_processed
 * @returns {object} Response object with message indicating success.
 */
app.post('/payment_processed', (req, res) => {
  console.log('Received payment_processed event.');
  res.status(200).send('Payment processed event handled successfully.');
});
/**
 * Endpoint to handle invoice processing event.
 * @method POST
 * @endpoint /invoice_processing
 * @returns {object} Response object with message indicating success.
 */
app.post('/invoice_processing', (req, res) => {
  console.log('Received invoice_processing event.');
  res.status(200).send('Invoice processing event handled successfully.');
});

/**
 * Endpoint to handle invoice completed event.
 * @method POST
 * @endpoint /invoice_completed
 * @returns {object} Response object with message indicating success.
 */
app.post('/invoice_completed', (req, res) => {
  console.log('Received invoice_completed event.');
  res.status(200).send('Invoice completed event handled successfully.');
});

/**
 * Ping endpoint to send test event to all registered webhooks.
 * @method POST
 * @endpoint /ping
 * @returns {object} Response object with message indicating success or failure and list of endpoints pinged.
 */
app.post('/ping', async (req, res) => {
  try {
    const pingedEndpoints = [];
    const rows = await new Promise((resolve, reject) => {
      db.all("SELECT endpoint FROM webhooks", (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });

    for (const row of rows) {
      try {
        await axios.post(row.endpoint); // Changed to axios.post
        console.log(`Calling webhook at: ${row.endpoint}`);
        pingedEndpoints.push(row.endpoint);
      } catch (error) {
        console.error(`Failed to call webhook at ${row.endpoint}:`, error.message);
      }
    }

    res.status(200).json({ 
      message: 'Ping event sent to all registered webhooks',
      pingedEndpoints: pingedEndpoints
    });
  } catch (error) {
    console.error('Failed to fetch registered webhooks:', error.message);
    res.status(500).json({ error: 'Failed to fetch registered webhooks' });
  }
});

/**
 * Endpoint to register a webhook for a specific event type.
 * @method POST
 * @endpoint /webhooks/register
 * @param {string} eventType - The type of event to register the webhook for.
 * @param {string} endpoint - The URL where the webhook should be called.
 * @returns {object} Response object with message indicating success or failure.
 */
app.post('/webhooks/register', (req, res) => {
  const { eventType, endpoint } = req.body;
  db.run("INSERT INTO webhooks (eventType, endpoint) VALUES (?, ?)", [eventType, endpoint], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to register webhook' });
    }
    res.status(200).json({ message: 'Webhook registered successfully' });
  });
});

/**
 * Endpoint to unregister a webhook.
 * @method POST
 * @endpoint /webhooks/unregister
 * @param {string} endpoint - The URL of the webhook to unregister.
 * @returns {object} Response object with message indicating success or failure.
 */
app.post('/webhooks/unregister', (req, res) => {
  const { endpoint } = req.body;
  db.run("DELETE FROM webhooks WHERE endpoint = ?", [endpoint], (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to unregister webhook' });
    }
    res.status(200).json({ message: 'Webhook unregistered successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Exposee server is running on port ${PORT}`);
});
