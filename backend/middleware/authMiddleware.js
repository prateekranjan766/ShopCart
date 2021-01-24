import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from './../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select(
        '-password -__v -createdAt -updatedAt'
      );

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not Authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not Authorized, no token');
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Authorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not Authorized');
  }
};

export { protect, admin };
