const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Eureka = require('eureka-js-client').Eureka;
require('dotenv').config();

const port = process.env.SERVER_PORT;

const app = express();
app.use(cors());

const productRoute = require('./routes/ProductRoute');
const ProductCategoryRoute = require('./routes/ProductcategoryRoute');
const DiscountRoute = require('./routes/DiscountRoute');

//=======================================
const eurekaClient = new Eureka({
    instance: {
        app: 'product-service-api',
        hostName: 'localhost',
        instanceId: 'product-service',
        ipAddr: '127.0.0.1',
        port: {
            '$': port,
            '@enabled': true
        },
        vipAddress: 'jq.test.something.com',
        statusPageUrl: 'http://localhost:3002/info',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
        registerWithEureka: true,
        fetchRegistry: true
    },
    eureka: {
        host: '127.0.0.1',
        port: 8761,
        servicePath: '/eureka/apps/'
    }
});

eurekaClient.start(function (error) {
    console.log('########################################################');
    console.log(JSON.stringify(error) || 'Eureka registration complete');
});
//=======================================

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

app.get('/api/v1/test', (req, resp, next) => {
    resp.send(`<h2>Hello User (Product Service)</h2>`);
});

process.on('SIGINT', () => {
    eurekaClient.stop(() => {
        console.log('server terminated!');
        process.exit();
    });
})

app.use('/api/v1/products', productRoute);
app.use('/api/v1/categories', ProductCategoryRoute);
app.use('/api/v1/discounts', DiscountRoute);
