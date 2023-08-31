import { Request, Response } from "express";
// import { subscriptions } from "../config";
import { Types } from "mongoose";
import sanitize from "mongo-sanitize";
import { validateEmail, validateRegisterInput, validateChangePassword } from "../validations/user.validation";

import UserService from "../services/user.service";
import LoggerService from "../services/logger.service";
import EmailService from "../services/email.service";
const stripe = require('stripe')('sk_test_51MmgB1FV9jrTcTNndcjmfpSASC7UcGXKKkmCgL2Q0jUNwcZcn7gI2qcE7NClKWWsPsh82Uc7HiedYv2FADz3st8L00hQFVyc7N');


interface AuthenticatedUser {
  id: Types.ObjectId;
  email: string;
  subscriptions?: [];
  roles: [];
  admin: boolean;
  addedBy: Types.ObjectId;
};

interface SubscriptionBody {
    title: string,
    price: number,
    teams: number,
    quantity: number,
    people: number,
    min: number,
    max: number
};

export const getUser = async (req: Request, res: Response) => {
  const user = req.user as AuthenticatedUser;
  const data = await UserService.getUserData(user.id as Types.ObjectId);
  
  return res.status(200).send({ message: "Success", data });
};

export const updateUser = async (req: Request, res: Response) => {
  const user = req.user as AuthenticatedUser;
  const body = req.body;
  
  const data = await UserService.updateUserData({ _id: user.id as Types.ObjectId, body });
  
  return res.status(200).send({ message: "Success", data });
};

export const postUser = async (req: Request, res: Response) => {
  // Validate Register input
  const { error } = validateRegisterInput(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let sanitizedInput = sanitize<{ 
    firstName: string, 
    lastName: string, 
    username: string,
    password: string,
    email: string 
    roles: string[],
    active: boolean
  }>(req.body);

  try {
    let user;
    user = await UserService.findUserBy("email", sanitizedInput.email.toLowerCase());

    if (user) {
      return res.status(400).send({ message: "Email already registered. Take an another email" });
    }

    sanitizedInput.roles = ['System Administrator'];
    const newUser = UserService.createUser(sanitizedInput);
    
    await UserService.setUserPassword(newUser, newUser.password);
    try {
      await UserService.saveUser(newUser);
      const OTP = await UserService.getOTP(sanitizedInput.email, 'register');

      if(!OTP) return res.status(400).send({ message: 'Error!' });
      
      const verificationEmail = EmailService.createVerificationEmail(
        newUser.email,
        OTP.OTP
      );
      try {
        await EmailService.sendEmail(verificationEmail);

        return res.status(200).send({ message: "Success", email: newUser.email });
      } catch (error) {
        UserService.deleteUserById(newUser._id);

        return res.status(503).send({
          message: `Impossible to send an email to ${newUser.email}, try again. Our service may be down.`,
        });
      }
    } catch (error) {
      LoggerService.log.error(error);

      return res.status(500).send({ message: "Creation of user failed, try again." });
    }
  } catch (error) {
    LoggerService.log.error(error);
    console.log('====================================');
    console.log({ error });
    console.log('====================================');
    return res.status(500).send("An unexpected error occurred");
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  // Validate Register input
  const { error } = validateEmail(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let sanitizedInput = sanitize<{ 
    email: string, 
    OTP: string
  }>(req.body);

  try {

    const verified = await UserService.verifyEmail(sanitizedInput.email, sanitizedInput.OTP);
    if(!verified) return res.status(400).send({ message: 'Invalid code!' });
    
    return res.status(200).send({ message: 'Success', verified });
  } catch (error) {
    LoggerService.log.error(error);
    console.log('====================================');
    console.log({ error });
    console.log('====================================');
    return res.status(500).send("An unexpected error occurred");
  }
};

export const postUserCancel = (req: Request, res: Response) => {
  const { error } = validateEmail(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const sanitizedInputs = sanitize<{ email: string }>(req.body);

  try {
    UserService.deleteUnverifiedUserByEmail(sanitizedInputs.email);
    return res.status(200).send({ message: "User reset success" });
  } catch (error) {
    return res.status(500).send("An unexpected error occurred");
  }
};

export const resendCode = async (req: Request, res: Response) => {
  try {
    const reqQuery = req.query;
    if(!reqQuery.email || !reqQuery.for) return res.status(400).send({ message: `Please provide ${reqQuery.email ? 'for' : 'email'} in query!`});
    const OTP = await UserService.resendCode(`${reqQuery.email}`, `${reqQuery.for}`);
    if(!OTP) return res.status(400).send({ message: 'Error' });

    const verificationEmail = EmailService.createVerificationEmail(
      OTP.email,
      OTP.OTP
    );
    try {
      await EmailService.sendEmail(verificationEmail);
    } catch (error) {

      return res.status(503).send({
        message: `Unable to send an email to ${OTP.email}, try again. Our service may be down.`,
        error
      });
    }

    return res.status(200).send({ message: 'Success', OTP });
  } catch (err) {
    
    return res.status(500).send("An unexpected error occurred");
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const reqQuery = req.query;
    if(!reqQuery.email) return res.status(400).send({ message: `Please provide 'email' in query!`});
    const OTP = await UserService.getOTP(`${reqQuery.email}`, 'forgotPassword');

    if(!OTP) return res.status(400).send({ message: 'Error'});

    const verificationEmail = EmailService.createVerificationEmail(
      OTP.email,
      OTP.OTP
    );
    try {
      await EmailService.sendEmail(verificationEmail);
    } catch (error) {

      return res.status(503).send({
        message: `Unable to send an email to ${OTP.email}, try again. Our service may be down.`,
        error
      });
    }
    
    return res.status(200).send({ message: 'Success', email: reqQuery.email });
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    
    return res.status(500).send("An unexpected error occurred");
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { error } = validateChangePassword(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const sanitizedInputs = sanitize<{ email: string, OTP: string, password: string }>(req.body);

    const data = await UserService.changePassword(sanitizedInputs.email, sanitizedInputs.OTP, sanitizedInputs.password);
    if(!data) return res.status(400).send({ message: "Error!" });

    return res.status(200).send({ message: "Success" });
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');

    return res.status(500).send("An unexpected error occurred");
  }
};

export const getSubscription = async (req: Request, res: Response) => {
  try {
    const subscriptionsBody = req.body as [SubscriptionBody];

    var stripeSubscriptionsList = [];
    var subscriptionsList = [];

    for(let j = 0; j<subscriptionsBody.length; j++) {
      const it = subscriptionsBody[j];
      
      const stripeProduct = await stripe.products.create({ name: it.title });
      const stripePrice = await stripe.prices.create({
        unit_amount: (it.price / it.quantity) * 100,
        currency: 'usd',
        product: stripeProduct.id,
      });

      stripeSubscriptionsList.push({ price: stripePrice.id, quantity: it.quantity });

      subscriptionsList.push({
        ...it,
        quantity: it.quantity
      });
    }
    if(!subscriptionsList.length) return res.status(400).send("subscription package not found!");

    const user = req.user as AuthenticatedUser;

    const session = await stripe.checkout.sessions.create({
      success_url: process.env.CLIENT_URL,
      line_items: stripeSubscriptionsList,
      mode: 'payment',
    });

    await UserService.update({ email: user.email }, { subscriptions: subscriptionsList, csId: session.id });    

    return res.status(200).send({ message: 'Success', data: session.url });
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');

    return res.status(500).send("An unexpected error occurred");
  }
};

export const paymentSuccess = async (req: Request, res: Response) => {
  try {
    const event = req.body;

    console.log({ event });

    // Handle the event
    switch (event.type) {
      case 'checkout.session.async_payment_succeeded':
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;
        const user = await UserService.findUserBy('csId', checkoutSessionAsyncPaymentSucceeded.id);
        if(!user) break;
        await UserService.update({ _id: user._id }, { subscribed: true });
        break;

      case 'checkout.session.completed':
        const checkoutSessionAsyncPaymentCompleted = event.data.object;
        const user1 = await UserService.findUserBy('csId', checkoutSessionAsyncPaymentCompleted.id);
        if(!user1) break;
        await UserService.update({ _id: user1._id }, { subscribed: true });
        break;

        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return res.status(200).end();
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');

    return res.status(500).send("An unexpected error occurred");
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const user = req.user as AuthenticatedUser;
    let sanitizedInput = sanitize<{ 
      firstName: string, 
      lastName: string, 
      username: string,
      active: boolean,
      roles: [],
      password: string,
      email: string,
      addedBy: Types.ObjectId
    }>(req.body);
    if(user.admin) {

      const exists = await UserService.findUserBy('email', sanitizedInput.email);
      if(exists) return res.status(400).send({ status: 'error', message: 'User already exists!' });

      sanitizedInput.addedBy = user.id;
      const newUserBody = UserService.createUser(sanitizedInput);

      const newUser = await UserService.saveUser(newUserBody);

      const URLBody = {
        id: newUser._id,
        email: newUser.email,
        subscriptions: [],
        roles: newUser.roles,
        addedBy: user.id
      }

      const URL = await UserService.getRedirectURL(URLBody);
      
      const verificationEmail = EmailService.addUserEmail(newUser.email, URL);

      await EmailService.sendEmail(verificationEmail);
      return res.status(200).send({ message: "Success", email: newUser.email });
    }
    return res.status(400).send({ message: "Error! Not admin." });
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');

    return res.status(500).send({ message: "An unexpected error occurred" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  var page = 1;
  var limit = 10;
  const filter = {};

  if(req.query.page) page = Number(req.query.page);
  if(req.query.limit) limit = Number(req.query.limit);
  if(req.query.roles) filter['roles'] = { $in: (req.query.roles as String).split(',') };
  if(req.query.id) filter['_id'] = { $in: (req.query.id as String).split(',') };
  
  if(req.query.search) filter['$or'] = [
    { email: { $regex: req.query.search, $options: "i" } }, 
    { firstName: { $regex: req.query.search, $options: "i" } }, 
    { lastName: { $regex: req.query.search, $options: "i" } } 
  ];

  const data = await UserService.getUsers(page, limit, filter);
  
  return res.status(200).send({ message: "Success", data });
};

export default {
  getUser,
  updateUser,
  postUser,
  postUserCancel,
  verifyUser,
  resendCode,
  forgotPassword,
  changePassword,
  getSubscription,
  paymentSuccess,
  addUser,
  getAll
};