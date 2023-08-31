import { model, Schema, Document, Types } from "mongoose";
import { omit } from "ramda";
import bcrypt from "bcryptjs";
import dayjs from "dayjs";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  isVerified: boolean;
  isAdmin: boolean;
  expires?: Date;
  subscriptions: [];
  csId: String;
  subscribed: boolean;
  roles: [];
  firstName: String;
  lastName: String;
  active: boolean;
  companyName: String;
  country: String;
  department: String;
  division: String;
  employeeNumber: String;
  extension: String;
  fax: String;
  phone: String;
  state: String;
  street: String;
  title: String;
  zipCode: String;
  addedBy: Types.ObjectId;
  lastLogin: Date;
  comparePassword(password: string): boolean;
  hidePassword(): void;
  hashPassword(): Promise<string>;
}

const userSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
  },
  passwordResetToken: { type: String, default: "" },
  passwordResetExpires: { type: Date, default: dayjs().toDate() },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  roles: {
    type: [String],
    enum: ['System Administrator', 'Read Only', 'Standard User'],
    default: []
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  subscriptions: {
    type: [{
      title: String,
      quantity: Number,
      price: Number,
      teams: Number,
      people: Number
    }],
    default: []
  },
  csId : {
    type: String
  },
  subscribed : {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: false
  },
  companyName: {
    type: String
  },
  country: {
    type: String
  },
  department: {
    type: String
  },
  division: {
    type: String
  },
  employeeNumber: {
    type: String
  },
  extension: {
    type: String
  },
  fax: {
    type: String
  },
  phone: {
    type: String
  },
  state: {
    type: String
  },
  street: {
    type: String
  },
  title: {
    type: String
  },
  zipCode: {
    type: String
  },
  addedBy: {
    type: Schema.Types.ObjectId
  },
  lastLogin: {
    type: Date
  }
});

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.hashPassword = function () {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err1, salt) => {
      if (err1) {
        reject(err1);
        return;
      }
      bcrypt.hash(this.password, salt, (err2, hash) => {
        if (err2) {
          reject(err2);
          return;
        }
        this.password = hash;
        resolve(hash);
      });
    });
  });
};

userSchema.methods.hidePassword = function () {
  return omit(["password", "__v", "_id"], this.toObject({ virtuals: true }));
};

export const User = model<UserDocument>("User", userSchema);

export default User;
