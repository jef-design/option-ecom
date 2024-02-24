const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    product_name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    stock: {
        type: String,
        required: true,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    review: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Admin'
        },
        // orderId: {
        //     type: Number,
        //     required: false,
        // },
        star: {
            type: Number,
            required: false,
        },
        comment: {
            type: String,
            required: false,
        },
        date: {
            type: Date,
            default: Date.now,
        }
        
    }],

}, {
    timestamps: true
})



module.exports = mongoose.model('Products', productSchema) 

