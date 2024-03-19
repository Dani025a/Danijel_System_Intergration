const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const PORT = 5001;

const SERVER_B_URL = 'http://127.0.0.1:5000';

app.get('/get/xml', async (req, res) => {
    try {
        const file = fs.createReadStream('../data/me.xml');
        file.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/get/csv', async (req, res) => {
    try {
        const file = fs.createReadStream('../data/me.csv');
        file.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/get/yaml', async (req, res) => {
    try {
        const file = fs.createReadStream('../data/me.yaml');
        file.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/get/txt', async (req, res) => {
    try {
        const file = fs.createReadStream('../data/me.txt');
        file.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/get/json', async (req, res) => {
    try {
        const file = fs.createReadStream('../data/me.json');
        file.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/data/xml', async (req, res) => {
    try {
        const response = await axios.get(`${SERVER_B_URL}/get/xml`, { responseType: 'stream' });
        response.data.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/data/csv', async (req, res) => {
    try {
        const response = await axios.get(`${SERVER_B_URL}/get/csv`, { responseType: 'stream' });
        response.data.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/data/yaml', async (req, res) => {
    try {
        const response = await axios.get(`${SERVER_B_URL}/get/yaml`, { responseType: 'stream' });
        response.data.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/data/txt', async (req, res) => {
    try {
        const response = await axios.get(`${SERVER_B_URL}/get/txt`, { responseType: 'stream' });
        response.data.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/data/json', async (req, res) => {
    try {
        const response = await axios.get(`${SERVER_B_URL}/get/json`, { responseType: 'stream' });
        response.data.pipe(res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server B is running on port ${PORT}`);
});
