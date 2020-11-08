const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require("dotenv").config();

const indexRouter = require('./routes/index');
const users = require('./routes/users');
const products = require("./routes/products.js");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Routing
 */
app.use('/', indexRouter);
app.use('/users', users);
app.use("/products", products);


module.exports = app;
