#!/usr/bin/env node


const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const cors = require('cors');

require('./config')

const categoryRouter = require('./routes/category.route');
const productRouter = require('./routes/product.route');
const adminRouter = require('./routes/admin.route');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', function(req, res, next) {
  res.json({
    message: 'Server is running'
  })
});


app.use('/api/admin', adminRouter)
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);



const port = 3000;
app.set('port', port);


app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});