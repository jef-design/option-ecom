const Order = require("../models/ordersModel");
const Carts = require("../models/cartsModel")

//   });
const stripe = require("stripe")(process.env.STRIPE_TEST);

const paymentIntent = async (req, res) => {
    const {amount} = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            automatic_payment_methods: {enabled: true},
            // metadata: {
            //   customer_name: 'jeff', // Store the customer's name in metadata
            // },
        });

        // Send publishable key and PaymentIntent details to client
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntent,
        });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
};
const cancelPaymentIntent = async (req, res) => {

    try {
        const intentId = req.body.paymentIntentId; // Assuming you send the Payment Intent ID from the frontend
        await stripe.paymentIntents.cancel(intentId);
        res.status(200).json({message: "Payment Intent canceled"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const checkOut = async (req, res) => {

    const userID = req.user._id
    const {items, total_amount} = req.body;
    
    try {
        let order = await Order.findOne({customer_id: userID, status: 'pending'});
    
        if (!order) {
            // Create a new cart if it doesn't exist
            order = await Order.create({
                customer_id: userID,
                items: items,
                total_amount: total_amount,
            });
        } else {
            // Update the existing cart
            order = await Order.findOneAndUpdate(
                {customer_id: userID},
                {
                    $push: {items: {product_id, quantity}},
                },
                {new: true}
            );
        }

        res.status(200).json({message: "order checkout", order});
    } catch (error) {}
};
const getCheckOut = async (req, res) => {
    const userID = req.user._id
   
    try {
        const order = await Order.findOne({customer_id: userID, status: 'pending'}).populate({
            path: "items.product_id",
            select: "product_name price images",
        });
        res.status(200).json({message: "getcheckout", order});
    } catch (error) {}
};

const getCheckOutProcess = async (req, res) => {
    const userID = req.user._id
   
    try {
        const order = await Order.find({customer_id: userID}).populate({
            path: "items.product_id",
            select: "product_name price images review",
        }).populate({
            path: 'customer_id',
            select: 'name'
        }).sort({createdAt: -1})
        res.status(200).json({message: "all purchaces", order});
    } catch (error) {

    }
};

const placeOrder = async (req, res) => {
   
    const userID = req.user._id
    const {full_Name, Phone_number, Address,order_id, items, payment_method, status} = req.body;
    try {
        const findOrder = await Order.findOne({order_id: order_id, status: "pending"});

        if (findOrder) {
            const order = await Order.findOneAndUpdate(
                {order_id: order_id, status: "pending"},
                {   
                    full_Name: full_Name,
                    Phone_number: Phone_number,
                    Address: Address,
                    payment_method: payment_method,
                    status: status,
                },
                {new: true}
            );
            await Carts.findOneAndUpdate(
              { customer_id: userID },
              { $pull: { items: { _id: { $in: items.map(item => item._id) } } } }
          );
            res.status(200).json({message: "order details", order});
        }
        
    } catch (error) {

    }
};
const cancelOrder = async (req, res) => {
  
   const { order_id, status} = req.body

   try {
    const order = await Order.findOneAndDelete({order_id, status})

    res.status(200).json({message: 'Order cancelled', order})
   } catch (error) {
    
   }
   
};

const getOrder = async (req, res) => {
    console.log(req.params)
    const item_id = req.params.id
    

    try {
      
     const order = await Order.findOne({'items._id':item_id},
     { 'items.$': 1 }).populate({
        path: "items.product_id",
        select:"product_name images.url"
     })
 
     res.status(200).json({message: 'Order get', order})
    } catch (error) {
     
    }
}

const adminChangeDeliveryStatus = async (req, res) => {
 
    const {order_id, status: newStatus} = req.body
    console.log(req.body)

    try {
        const status = await Order.findOneAndUpdate({order_id: order_id},{status: newStatus},{new: true})
        
        res.status(200).json({message: 'Delivery Status Changed', status})
    } catch (error) {
        
    }
}

module.exports = {paymentIntent, cancelPaymentIntent, checkOut,getCheckOutProcess, getCheckOut, placeOrder, cancelOrder, getOrder,adminChangeDeliveryStatus};
