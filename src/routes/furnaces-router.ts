import { Router } from "express";
import { furnacesController } from "../modules/furnaces/furnaces-factory";

export const furnacesRouter = Router();

furnacesRouter.post("/", furnacesController.create);
furnacesRouter.get("/", furnacesController.findAll);
furnacesRouter.get("/:id", furnacesController.findOne);
furnacesRouter.delete("/:id", furnacesController.delete);
furnacesRouter.put("/:id", furnacesController.update);
