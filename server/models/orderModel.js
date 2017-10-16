var mongoose = require('mongoose');

var orderModel = mongoose.Schema({
    companyName: {
        type: String
    },
    customerAddress: {
        type: String
    },
    orderedItem: {
        type: Number
    },
    orderCost: {
        type: Number
    },
    orderDate: {
        type: Date
    }
});

orderModel.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.orderId = ret._id;
         delete ret._id;
         delete ret.__v;
     }
})

module.exports = mongoose.model('Order', orderModel);