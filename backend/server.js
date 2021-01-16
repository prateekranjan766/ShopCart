const express = require('express')
const products = require('./data/products')

const app = express()

app.get('/', (req, res) => {
  res.send(`Api running...`)
})
app.get('/api/products', (req, res) => {
  res.json(products)
})
app.get(`/api/products/:id`, (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

const port = 5000
app.listen(port, () => console.log(`Server started at port ${port}...`))
