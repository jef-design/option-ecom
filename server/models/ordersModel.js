const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    // order_id: {
    //     type: String,
    //     default: mongoose.Types.ObjectId, // Generate a unique ID
    // },
    order_id: {
        type: String,
        default: function() {
            return new mongoose.Types.ObjectId().toHexString();
        },
        unique: true,
    },
    customer_id: {
        type: String,
        required: true,
        ref: 'Admin'
  
    },
    full_Name: {
        type: String
    },
    Phone_number: {
        type: String
    },
    Address: {
        type: String
    },
    items: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Products'
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    payment_method: {
        type: String,
    },
    total_amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: false,
        default: 'pending'
    },
    
}, {
    timestamps: true
})



module.exports = mongoose.model('Orders', orderSchema) 

