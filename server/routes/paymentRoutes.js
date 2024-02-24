const express = require('express')
const {paymentIntent,cancelPaymentIntent, checkOut,getCheckOut,placeOrder, cancelOrder, getCheckOutProcess, getOrder, adminChangeDeliveryStatus} = require('../controllers/paymentContoller')
const authMiddleWare = require('../middleware/authMiddleWare')
const router = express.Router()


router.get("/check-out",authMiddleWare, getCheckOut)
router.post("/check-out",authMiddleWare, checkOut)
router.get("/orders", authMiddleWare, getCheckOutProcess)
router.post("/delivery-status", authMiddleWare, adminChangeDeliveryStatus)
router.post("/create-payment-intent", paymentIntent)
router.post("/cancel-payment-intent", cancelPaymentIntent)
router.post("/place-order",authMiddleWare, placeOrder)
router.post("/cancel-order", cancelOrder)
router.get("/:id", getOrder)


module.exports = router