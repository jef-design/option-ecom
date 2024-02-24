const express = require('express')
const env = require('dotenv')
const cors = require('cors')
env.config()
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser")
const productRoutes = require('./routes/productRoutes')
const checkOutRoutes = require('./routes/paymentRoutes')
const adminRoutes = require('./routes/admin/adminRoutes')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['POST','GET','DELETE','PATCH'],
    credentials: true
}))

// app.get('/', (req, res) => {
//     console.log('hello')
//     res.send('hey')
//     nex
// })

app.use('/api/products', productRoutes)
app.use('/api/order', checkOutRoutes)
app.use('/api/admin', adminRoutes)

mongoose.connect(process.env.MONGOOSE_URI)
.then(()=> {
    app.listen(process.env.PORT || 5000, (req, res) => {
        console.log(`connected on ${process.env.PORT}`)
    })
})

