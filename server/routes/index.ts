import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import menuRoutes from "./Menu.routes";
import blogRoutes from "./Blog.routes";
import teamRoutes from './Teams.routes';
import chatRoutes from './Chat.routes';

import commonLogsRoutes from "./CommonLogs.routes";
import staticRoutes from './static.routes';
import { Express } from "express";
import errorHandler from "../middlewares/errorHandler";

export function initRoutes(app: Express) {
  app.use("/api/user", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/team", teamRoutes);
  app.use("/api/chat", chatRoutes);
  app.use("/api/menu", menuRoutes);
  app.use("/api/blog", blogRoutes);
  app.use("/api/commonLogs", commonLogsRoutes);
  app.use("/api/static", staticRoutes);
  app.use("/api/healthcheck", (req, res) => res.send("OK"));
  app.use(errorHandler);
};