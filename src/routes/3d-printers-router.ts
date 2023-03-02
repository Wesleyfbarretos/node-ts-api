import { Router } from "express";
import { printersController } from "../modules/3d-printers/3d-printers-factory";

export const printersRouter = Router();

printersRouter.post("/", printersController.create);
printersRouter.get("/", printersController.findAll);
printersRouter.get("/:id", printersController.findOne);
printersRouter.delete("/:id", printersController.delete);
printersRouter.put("/:id", printersController.update);
printersRouter.put("/name/:id", printersController.updateName);
printersRouter.put("/ip-adress/:id", printersController.updateIp);
printersRouter.put("/type/:id", printersController.updateType);
printersRouter.put("/online/:id", printersController.updateOnlineStatus);
