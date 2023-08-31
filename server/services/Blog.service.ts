import { Blog, BlogDocument } from '../models/Blog.model';

export const create = async ({
  content,
  userId,
  title
}: BlogDocument) => await Blog.create({ content, userId, title });

export const find = async (filter: {}) => await Blog.find(filter);

export const update = async (filter: {}, {
  subBlogs,
  content,
  title,
  active
}: {
  subBlogs: [],
  content: string,
  title: string,
  active: boolean
}) => await Blog.findOneAndUpdate(filter, { subBlogs, content, title, active }, { new: true });

export const deleteOne = async (filter: {}) => await Blog.findOneAndDelete(filter);

export default {
  create,
  find,
  update,
  deleteOne
};