import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

//loading .env file in the backend to process.env
dotenv.config();

//Connecting to the Database
connectDB();

//Initialising App
const app = express();
app.use(express.json());

//API routes
app.get('/', (req, res) => {
  res.send(`Api running...`);
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

//Error Middlewares
app.use(notFound);
app.use(errorHandler);

//Server Starting
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server started in ${process.env.NODE_ENV} mode at port ${PORT}...`.yellow
      .bold.underline
  )
);
