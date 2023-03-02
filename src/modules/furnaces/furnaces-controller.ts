import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { MessagesHelper } from "../../helpers/messages-helper";
import { CreateOrUpdateFurnaceInputDTO } from "./dtos/create-furnace-dto";
import { FurnacesService } from "./furnaces-service";

export class FurnacesController {
  constructor(private furnacesService: FurnacesService) {
    this.furnacesService = furnacesService;
  }

  create = async (req: Request, res: Response) => {
    const body: CreateOrUpdateFurnaceInputDTO = req.body;
    const result = await this.furnacesService.create(body);

    res.status(StatusCodes.CREATED).json({
      message: MessagesHelper.furnacesController.CREATED,
      furnace: result,
    });
  };

  findAll = async (req: Request, res: Response) => {
    const result = await this.furnacesService.findAll();
    res.json(result);
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.furnacesService.findOne(id);
    res.json(result);
  };

  update = async (req: Request, res: Response) => {
    const body: CreateOrUpdateFurnaceInputDTO = req.body;
    const { id } = req.params;
    const result = await this.furnacesService.update(body, id);
    res.json({
      message: MessagesHelper.furnacesController.UPDATED,
      updatedFurnace: result,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.furnacesService.delete(id);
    res.status(StatusCodes.NO_CONTENT).send();
  };
}
