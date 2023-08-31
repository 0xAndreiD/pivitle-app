import { Document, Schema, model, Types } from 'mongoose';


interface menu extends Document {
  content: string;
  title: string;
  subMenus: [];
  active: boolean;
  userId: Types.ObjectId;
  allowComments: boolean
};

const menuSchema = new Schema<menu>({
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  title: { type: String, required: true },
  content: { type: String },
  active: { type: Boolean, default: false },
  subMenus: [],
  allowComments: { type: Boolean, default: true }
});


const Menu = model<menu>('Menu', menuSchema);

export { menu, Menu };