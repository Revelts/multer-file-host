const express = require('express');
const app = require('express')();
const randomString = require('random-string');
const checkApiKey = require('../config/check-api-key');
const fileUpload = require('../config/multer-config');
const cors = require('cors');

const notifyConnect = () => {
    console.log(`SERVER API CONNECTED TO ${process.env.EXPRESS_API_HOST}:${process.env.EXPRESS_API_PORT}`);
};

const initiateExpress = () => {
    if (!process.env.EXPRESS_API_SECRET_KEY) {
        process.env.EXPRESS_API_SECRET_KEY = randomString({ length: 64 });
        // eslint-disable-next-line no-console
        console.info(`Since you are not setup API key correctly, we generate it for you: ${process.env.EXPRESS_API_SECRET_KEY}`);
    }
    app.use(cors);
    app.use(express.static(__dirname + '/public'));
    app.use('/uploads', express.static('uploads'));
    app.post('/upload-single', checkApiKey, fileUpload);
    app.listen(process.env.EXPRESS_API_PORT, process.env.EXPRESS_API_HOST, notifyConnect);
}


module.exports = initiateExpress;
