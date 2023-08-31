import { menu, Menu } from '../models/Menu.model';

export const create = async ({
  subMenus,
  content,
  userId,
  title
}: menu) => await Menu.create({ subMenus, content, userId, title });

export const find = async (filter: {}) => await Menu.find(filter);

export const update = async (filter: {}, {
  subMenus,
  content,
  title,
  active
}: {
  subMenus: [],
  content: string,
  title: string,
  active: boolean
}) => await Menu.findOneAndUpdate(filter, { subMenus, content, title, active }, { new: true });

export const deleteOne = async (filter: {}) => await Menu.findOneAndDelete(filter);

export default {
  create,
  find,
  update,
  deleteOne
};