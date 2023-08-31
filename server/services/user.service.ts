import { Schema } from "mongoose";
import { User, UserDocument } from "../models/user.model";
import { OTP } from "../models/OTP.model";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { Types } from "mongoose";

export const getUser = (user: UserDocument) => user.hidePassword();

export const getUserData = async (_id: Types.ObjectId) =>
  await User.findById(_id);

export const createUser = ({
  username,
  email,
  password,
  firstName,
  lastName,
  roles,
  active,
  addedBy,
}: {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: string[];
  active: boolean;
  addedBy?: Types.ObjectId;
}) =>
  new User({
    username,
    email,
    password,
    firstName,
    lastName,
    roles,
    active,
    addedBy,
  });

export const setResetPasswordToken = (
  user: UserDocument,
  resetTokenValue: string,
  expiryDate: Date
) => {
  user.passwordResetToken = resetTokenValue;
  user.passwordResetExpires = expiryDate;
};

export const findUserBy = async (prop: string, value: string) =>
  await User.findOne({ [prop]: value });

export const findUserById = async (id: typeof Schema.Types.ObjectId) =>
  await User.findById(id);

export const saveUser = async (user: UserDocument) => await user.save();

export const updateUserData = async ({
  _id,
  body,
}: {
  _id: Types.ObjectId;
  body: UserDocument;
}) => {
  if (body.password) body.password = await bcryptjs.hash(body.password, 10);
  return await User.findOneAndUpdate({ _id }, body, { new: true });
};

export const setUserPassword = async (user: UserDocument, password: string) => {
  user.password = password;
  user.passwordResetToken = "";
  user.passwordResetExpires = dayjs().toDate();
  return await user.hashPassword();
};

export const setUserVerified = async (user: UserDocument) => {
  user.isVerified = true;
  user.expires = undefined;
};

export const deleteUserById = async (user: UserDocument) =>
  await User.findByIdAndDelete(user._id);

export const deleteUnverifiedUserByEmail = async (email: string) =>
  await User.findOneAndDelete({ email, isVerified: false });

export const getOTP = async (email: string, purpose: string) => {
  const user = await User.findOne({ email });
  if (!user) return false;

  const exists = await OTP.findOne({ email, for: purpose });
  if (exists) return false;

  return await OTP.create({ OTP: getCode(), email, for: purpose });
};

export const verifyEmail = async (email: string, code: string) => {
  const verified = await OTP.findOneAndDelete({
    email,
    OTP: code,
    for: "register",
  });
  if (!verified) return false;
  const user = await User.findOneAndUpdate({ email }, { isVerified: true });

  const data = {
    email: user?.email,
    id: user?._id,
    subscribed: user?.subscribed,
    subscriptions: user?.subscriptions,
    roles: user?.roles,
    addedBy: user?.addedBy,
  };

  console.log({ tokenData: data });

  return {
    user,
    Authorization: await getToken(data),
  };
};

export const update = async (filter: object, body: object) =>
  await User.findOneAndUpdate(filter, body);

export const resendCode = async (email: string, purpose: string) => {
  const exists = await OTP.findOne({ email, for: purpose });
  if (!exists) return await getOTP(email, purpose);

  return await OTP.findOneAndUpdate(
    { email, for: purpose },
    { OTP: getCode() },
    { new: true }
  );
};

export const changePassword = async (
  email: string,
  code: string,
  password: string
) => {
  const exists = await OTP.findOneAndDelete({
    email,
    OTP: code,
    for: "forgotPassword",
  });
  if (!exists) return false;

  password = await bcryptjs.hash(password, 10);
  return await User.findOneAndUpdate({ email }, { password: password });
};

export const login = async (email: string, password: string) => {
  var data = await User.findOne({ email });
  if (!data) return false;

  const result = await bcryptjs.compare(password, data.password);
  if (!result) return false;

  await User.findOneAndUpdate({ email }, { lastLogin: new Date() });

  const tokenData = {
    email: data.email,
    id: data._id,
    subscribed: data.subscribed,
    subscriptions: data.subscriptions,
    roles: data.roles,
    addedBy: data.addedBy,
  };

  return {
    data,
    Authorization: await getToken(tokenData),
  };
};

export const getUsers = async (page: number, limit: number, filter: object) =>
  await User.find(filter, { password: 0 }, { skip: limit * (page - 1), limit });

let getToken = async (body: object) =>
  await jwt.sign(body, process.env.JWT_SECRET || "", {
    expiresIn: process.env.JWT_EXPIRY,
  });

let getCode = () =>
  Math.floor(Math.random() * (9 * Math.pow(10, 4 - 1))) + Math.pow(10, 4 - 1);

let getRedirectURL = async (body: object) => {
  const token = await jwt.sign(body, process.env.JWT_SECRET || "", {
    expiresIn: process.env.JWT_EXPIRY,
  });
  return process.env.CLIENT_URL + "/#/updatePassword" + "?token=" + token;
};

export default {
  getUser,
  getUserData,
  updateUserData,
  getOTP,
  createUser,
  setResetPasswordToken,
  findUserBy,
  findUserById,
  saveUser,
  setUserPassword,
  setUserVerified,
  deleteUserById,
  deleteUnverifiedUserByEmail,
  verifyEmail,
  update,
  resendCode,
  changePassword,
  login,
  getRedirectURL,
  getUsers,
};
