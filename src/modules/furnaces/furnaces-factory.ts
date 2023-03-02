import { prismaService } from "../../prisma/prisma-client";
import { FurnacesController } from "./furnaces-controller";
import { FurnacesService } from "./furnaces-service";

const furnacesService = new FurnacesService(prismaService);

export const furnacesController = new FurnacesController(furnacesService);
