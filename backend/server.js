require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./config/db');
const port = process.env.DB_PORT;

app.use(express.json());
app.listen(port, () => {
    console.log(`Server run at http://localhost:${port}`);
});