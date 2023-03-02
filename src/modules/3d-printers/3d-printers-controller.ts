import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PrintersService } from "./3d-printers-service";
import { CreateOrUpdatePrinterInputDTO } from "./dtos/create-printer-dto";

export class PrintersController {
  constructor(private printersService: PrintersService) {
    this.printersService = printersService;
  }

  create = async (req: Request, res: Response) => {
    const body: CreateOrUpdatePrinterInputDTO = req.body;
    const result = await this.printersService.create(body);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "storaged new printer", printer: result });
  };

  findAll = async (req: Request, res: Response) => {
    const result = await this.printersService.findAll();
    res.json(result);
  };

  findOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.printersService.findOne(id);
    res.json(result);
  };

  update = async (req: Request, res: Response) => {
    const body: CreateOrUpdatePrinterInputDTO = req.body;
    const { id } = req.params;
    const result = await this.printersService.update(body, id);
    res.json({ message: "Succesfully updated", updatedPrinter: result });
  };

  updateName = async (req: Request, res: Response) => {
    const { name } = req.body;
    const { id } = req.params;
    const result = await this.printersService.updateName(name, id);
    res.json({ message: "sucessfully updated", updatedPrinter: result });
  };

  updateIp = async (req: Request, res: Response) => {
    const { ipAdress } = req.body;
    const { id } = req.params;
    const result = await this.printersService.updateIp(ipAdress, id);
    res.json({ message: "sucessfully updated", updatedPrinter: result });
  };

  updateType = async (req: Request, res: Response) => {
    const { type } = req.body;
    const { id } = req.params;
    const result = await this.printersService.updateType(type, id);
    res.json({ message: "sucessfully updated", updatedPrinter: result });
  };

  updateOnlineStatus = async (req: Request, res: Response) => {
    const { online } = req.body;
    const { id } = req.params;
    const result = await this.printersService.updateOnlineStatus(online, id);
    res.json({ message: "sucessfully updated", updatedPrinter: result });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.printersService.delete(id);
    res.status(StatusCodes.NO_CONTENT).send();
  };
}
