const express = require('express')

const cors = require('cors')

const productRoutes = require('./routes/product.routes')

const authRoutes = require('./routes/auth.routes')

const orderRoutes = require('./routes/order.routes')

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {

  res.send('Retail POS API Running')

})

app.use('/products', productRoutes)

app.use('/auth', authRoutes)

app.use('/orders', orderRoutes)

module.exports = app
