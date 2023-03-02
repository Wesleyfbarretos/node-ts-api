import { Router } from "express";
import { printersRouter } from "./3d-printers-router";
import { furnacesRouter } from "./furnaces-router";

export const routes = Router();

routes.use("/3d-printers", printersRouter);
routes.use("/furnaces", furnacesRouter);
