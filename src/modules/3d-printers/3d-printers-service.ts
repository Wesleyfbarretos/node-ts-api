import { PrismaClient } from "@prisma/client";
import {
  BadRequestError,
  NotFoundError,
} from "../../helpers/api-errors-helper";
import {
  CreateOrUpdatePrinterInputDTO,
  CreateOrUpdatePrinterOutputDTO,
} from "./dtos/create-printer-dto";
import { FindAllPrinterOutputDTO } from "./dtos/findAll-printer-dto";
import { FindOnePrinterOutputDTO } from "./dtos/findOne-printer-dto";

export class PrintersService {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(
    data: CreateOrUpdatePrinterInputDTO
  ): Promise<CreateOrUpdatePrinterOutputDTO> {
    const { ip_adress: ipAdress, name, online, type } = data;

    if (!ipAdress) throw new BadRequestError("please inform the ip_adress");
    if (!name) throw new BadRequestError("please inform the name");
    if (!type) throw new BadRequestError("please inform the type");
    if (online == undefined)
      throw new BadRequestError("please inform the online status");

    const result = await this.prisma.printers_3D.findUnique({
      where: { ip_adress: ipAdress },
    });

    if (result)
      throw new BadRequestError(
        "there is another printer with the same ip in our bank, try again."
      );

    return this.prisma.printers_3D.create({
      data: {
        name,
        online,
        type,
        ip_adress: ipAdress,
      },
    });
  }

  async findAll(): Promise<FindAllPrinterOutputDTO[]> {
    return this.prisma.printers_3D.findMany({
      select: {
        id: true,
        name: true,
        ip_adress: true,
        type: true,
        online: true,
      },
    });
  }

  async findOne(ip_adress: string): Promise<FindOnePrinterOutputDTO> {
    const result = await this.prisma.printers_3D.findUnique({
      where: { ip_adress },
    });

    if (!result) throw new NotFoundError("Printer not exist");

    return result;
  }

  async update(
    data: CreateOrUpdatePrinterInputDTO,
    ip_adress: string
  ): Promise<CreateOrUpdatePrinterOutputDTO> {
    return this.prisma.printers_3D.update({
      where: { ip_adress },
      data,
    });
  }

  async updateName(
    name: string,
    ip_adress: string
  ): Promise<CreateOrUpdatePrinterOutputDTO> {
    return this.prisma.printers_3D.update({
      where: { ip_adress },
      data: {
        name,
      },
    });
  }

  async updateIp(
    ip: string,
    ip_adress: string
  ): Promise<CreateOrUpdatePrinterOutputDTO> {
    return this.prisma.printers_3D.update({
      where: { ip_adress },
      data: {
        ip_adress: ip,
      },
    });
  }

  async updateType(
    type: string,
    ip_adress: string
  ): Promise<CreateOrUpdatePrinterOutputDTO> {
    return this.prisma.printers_3D.update({
      where: { ip_adress },
      data: {
        type,
      },
    });
  }

  async updateOnlineStatus(
    online: boolean,
    ip_adress: string
  ): Promise<CreateOrUpdatePrinterOutputDTO> {
    return this.prisma.printers_3D.update({
      where: { ip_adress },
      data: {
        online,
      },
    });
  }

  async delete(ip_adress: string): Promise<void> {
    await this.prisma.printers_3D.delete({ where: { ip_adress } });
  }
}
