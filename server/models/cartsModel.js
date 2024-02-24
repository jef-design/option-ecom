const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({

    customer_id: {
        type: String,
        required: true,
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
    

}, {
    timestamps: true
})



module.exports = mongoose.model('Carts', cartSchema) 

