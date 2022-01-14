const express = require('express');

const app = express();
const apiRoute = require ('./note')

app.use('/notes', apiRoute);




module.exports = app;