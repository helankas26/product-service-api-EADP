const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.SERVER_PORT;

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());

try {
    mongoose.connect('mongodb://localhost:27017/eadp_product_api_db');
    app.listen(port, () => {
        console.log('server up and running!');
    })
} catch (e) {
    console.log(e)
}