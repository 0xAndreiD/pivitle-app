import { Document, Schema, model, Types } from 'mongoose';


interface BlogDocument extends Document {
  content: string;
  title: string;
  userId: Types.ObjectId;
};

const BlogSchema = new Schema<BlogDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  title: { type: String, required: true },
  content: { type: String }
});


const Blog = model<BlogDocument>('Blog', BlogSchema);

export { Blog, BlogDocument };