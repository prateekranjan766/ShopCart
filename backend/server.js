import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';
import connectDB from './config/db.js';
import colors from 'colors';

//loading .env file in the backend to process.env
dotenv.config();

//Connecting to the Database
connectDB();

//Initialising App
const app = express();

//API routes
app.get('/', (req, res) => {
  res.send(`Api running...`);
});
app.get('/api/products', (req, res) => {
  res.json(products);
});
app.get(`/api/products/:id`, (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

//Server Starting
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server started in ${process.env.NODE_ENV} mode at port ${PORT}...`.yellow
      .bold.underline
  )
);
