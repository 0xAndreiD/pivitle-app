import { Request, Response } from "express";
import { Types } from "mongoose";
import MenuService from "../services/menu.service";

interface AuthenticatedUser {
  id: Types.ObjectId;
  email: string;
  subscriptions?: [];
  roles: [];
  admin: boolean;
  addedBy: Types.ObjectId;
};


export const create = async (req: Request, res: Response) => {

  const user = req.user as AuthenticatedUser;

  try {
    const body = {
      ...req.body,
      userId: user.id
    }

    console.log({ body });
    
    const data = await MenuService.create(body);
    return res.send({ message: 'Success', data }).status(200);
  } catch (error) {
    console.log('====================================');
    console.log({ error });
    console.log('====================================');
    return res.status(500).send({ error: 'An unexpected error occurred!' });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const user = req.user as AuthenticatedUser;
    const reqQuery = req.query;
    const filter: { _id?: Types.ObjectId, userId?: Types.ObjectId, $or?: object[] } = {};
    user.admin ? filter['$or'] = [ { 'userId': user.id }, { 'userId': user.addedBy }]  : filter['userId'] = user.addedBy;
    
    if(reqQuery.id) filter['_id'] = new Types.ObjectId(reqQuery.id as string);

    const data = await MenuService.find(filter);
    
    return res.send({ message: 'Success', data }).status(200);
  } catch (error) {
    console.log('====================================');
    console.log({ error });
    console.log('====================================');
    return res.status(500).send({ error: 'An unexpected error occurred!' });
  }
};

export const update = async (req: Request, res: Response) => {

  const user = req.user as AuthenticatedUser;

  try {
    const body = {
      ...req.body
    };
    const filter = {
      _id: req.params.id,
      userId: user.id
    };
    const data = await MenuService.update(filter, body);
    return res.send({ message: 'Success', data }).status(200);
  } catch (error) {
    console.log('====================================');
    console.log({ error });
    console.log('====================================');
    return res.status(500).send({ error: 'An unexpected error occurred!' });
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const user = req.user as AuthenticatedUser;
    const filter = {
      userId: user.id,
      _id: req.params.id
    }
    const data = await MenuService.deleteOne(filter);
    
    console.log({ data });
    
    return res.send({ message: 'Success', data }).status(200);
  } catch (error) {
    console.log('====================================');
    console.log({ error });
    console.log('====================================');
    return res.status(500).send({ error: 'An unexpected error occurred!' });
  }
};