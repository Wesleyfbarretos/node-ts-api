import { prismaService } from "../../prisma/prisma-client";
import { PrintersController } from "./3d-printers-controller";
import { PrintersService } from "./3d-printers-service";

const printersService = new PrintersService(prismaService);

export const printersController = new PrintersController(printersService);
