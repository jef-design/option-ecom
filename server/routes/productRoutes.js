const express = require('express')
const { getAllProducts, addProduct,getProduct,addToCart,getCart,deleteCart, addPoductReview } = require('../controllers/productsController')
const multer = require('multer')
const authMiddleWare = require('../middleware/authMiddleWare')
const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage})

router.post('/cart', addToCart)
router.get('/cart', authMiddleWare, getCart)
router.patch('/cart/:id', deleteCart)
router.get('/search', getAllProducts)
router.get('/:id', getProduct)
router.post('/', upload.array('images', 5), addProduct)
router.post('/review/:id' ,addPoductReview)



module.exports = router