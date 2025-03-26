require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const db = require('./app/config/db');
const userRoute = require('./app/routes/user_route');
const aiRoute = require('./app/routes/gemini_routes');
const fileRoute = require('./app/routes/file_route');
const cors = require('cors');
const port = process.env.DB_PORT;


app.use(express.static(path.join(__dirname, 'html')));


app.use(cors({
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(express.json());
app.use('/users', userRoute);
app.use('/ai', aiRoute);
app.use('/files', fileRoute);
app.use(cors());
app.listen(port, () => {
    console.log(`Server run at http://localhost:${port}`);
});