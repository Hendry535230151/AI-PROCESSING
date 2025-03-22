require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./app/config/db');
const userRoute = require('./app/routes/user_route');
const port = process.env.DB_PORT;

app.use(express.json());
app.use('/users', userRoute);
app.listen(port, () => {
    console.log(`Server run at http://localhost:${port}`);
});