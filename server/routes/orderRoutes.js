var express = require('express');
var _ = require('lodash');

var routes = function (Order) {
    //create express route
    var orderRouter = express.Router();

    orderRouter.route('/')
        //create order
        .post(function (req, res) {
            var order = new Order(req.body);
            order.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log('post: ' + new Date());
                    res.status(201).send(order);
                }
            });


        })
        //get all orders
        .get(function (req, res) {

            Order.find(function (err, orders) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    console.log('Get: ' + new Date());
                    res.json(orders);
                }
            })

        });

    //middleware for orderId urls.
    orderRouter.use('/:orderId', function (req, res, callback) {
        Order.findById(req.params.orderId, function (err, order) {
            if (err) {
                res.status(500).send(err);
            } else if (order) {
                req.order = order;
                callback();
            } else {
                res.status(404).send('not found');
            }
        });
    })
    orderRouter.route('/:orderId')
        //get by id
        .get(function (req, res) {

            res.json(req.order);

        })
        //put by id
        .put(function (req, res) {
            req.order.companyName = req.body.companyName;
            req.order.customerAddress = req.body.customerAddress;
            req.order.orderedItem = req.body.orderedItem;
            req.order.orderCost = req.body.orderCost;
            req.order.orderDate = req.body.orderDate;
            req.order.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.order);
                }
            });
        })
        //patch by id
        .patch(function (req, res) {
            _.forIn(req.body, function (value,key) {
                if (key == 'orderId') {
                    delete req.body.orderId;
                } else {
                    req.order[key] = value;
                }

            });
            req.order.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.order);
                }
            })
        })
        .delete(function (req, res) {
            req.order.remove(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('deleted');
                }
            })
        });

    return orderRouter;
}
module.exports = routes;