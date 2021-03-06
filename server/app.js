var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//data access
var db = mongoose.connect('mongodb://localhost/orderAPI');
var Order = require('./models/orderModel');

//server congfig.
var app = express();
var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATCH, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//for post method body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routing config.
var orderRouter = require('./routes/orderRoutes')(Order);
app.use('/order', orderRouter);
app.get('/', function (req, res) {
    res.send('welcome to express api');
});


app.listen(port, function () {
    console.log('running on PORT: ' + port);
});