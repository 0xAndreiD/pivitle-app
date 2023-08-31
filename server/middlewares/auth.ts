import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

interface User {
  id: Types.ObjectId;
  email: string;
  subscriptions?: [];
  roles: string[];
  admin?: boolean,
  addedBy: Types.ObjectId;
};

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
};

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  
  // get the token from the header if present
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  // if no token found, return response (without going to the next middleware)
  if (!token) {
    return res.send('You are UnAuthorized to View this content!').status(401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as User;
    if(decoded.roles && decoded.roles.includes('System Administrator')) decoded.admin = true;
    req.user = decoded;
    next();
  } catch (ex) {
    console.error(ex);
    res.send('Invalid Token!').status(400);
  }
};