import { model, Schema, Document } from "mongoose";

export interface OTPDocument extends Document {
  OTP: string,
  email: string,
  createdAt: Date,
  for: string
}

const OTPSchema = new Schema<OTPDocument>({
  OTP: {
    type: String,
    required: true
  },
  for: {
    type: String,
    enum: ['forgotPassword', 'register'],
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdAt: { type: Date, required: true, default: new Date(), expires: 600 },
});

export const OTP = model<OTPDocument>("OTP", OTPSchema);

export default OTP;
