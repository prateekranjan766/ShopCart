import express from 'express';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

//loading .env file in the backend to process.env
dotenv.config();

//Connecting to the Database
connectDB();

//Initialising App
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

//API routes

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.use('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  // app.use(express.static(path.join(__dirname, '/frontend/build')));

  // app.get('*', (req, res) =>
  //   res.sendFile(path.resolve(__dirname, 'frontend', 'bulid', 'index.html'))
  // );
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));

  app.use('*', express.static(path.join(__dirname, 'frontend', 'build')));
} else {
  app.get('/', (req, res) => {
    res.send(`Api running...`);
  });
}

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
