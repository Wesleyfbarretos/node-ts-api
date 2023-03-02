import cors from "cors";
import express from "express";
import "express-async-errors";
import { errorMiddleware } from "./middlewares/api-error-middleware";
import { routes } from "./routes";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(routes);
  app.use(errorMiddleware);

  return app;
}
