import { Request, Response } from "express";
import { subscriptions } from '../config';
import { sendEmail, createContactUsEmail } from "../services/email.service";


export const getSubscriptions = async (req: Request, res: Response) => {
  try {
    return res.send({ message: 'Success', data: subscriptions }).status(200);
  } catch (error) {
    console.log('====================================');
    console.log({ error });
    console.log('====================================');
    return res.status(500).send({ error: 'An unexpected error occurred!' });
  }
};

export const sendUserEmail = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log('====================================');
    console.log(body);
    console.log('====================================');
    const email = createContactUsEmail(body);
    await sendEmail(email);
    return res.status(200).send("Success");
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return res.status(500).send({ error: 'An unexpected error occurred!', data: error });
  }
};