import { PrismaClient } from "@prisma/client";
import {
  BadRequestError,
  NotFoundError,
} from "../../helpers/api-errors-helper";
import { MessagesHelper } from "../../helpers/messages-helper";
import {
  CreateOrUpdateFurnaceInputDTO,
  CreateOrUpdateFurnaceOutputDTO,
} from "./dtos/create-furnace-dto";
import { FindAllFurnacesOutputDTO } from "./dtos/findAll-furnace-dto";
import { FindOneFurnaceOutputDTO } from "./dtos/findOne-furnace.dto";

export class FurnacesService {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(
    data: CreateOrUpdateFurnaceInputDTO
  ): Promise<CreateOrUpdateFurnaceOutputDTO> {
    const { ip_adress: ipAdress, max_temperature, name, online, type } = data;

    if (!ipAdress)
      throw new BadRequestError(MessagesHelper.furnacesService.INFORM_IP);
    if (!name)
      throw new BadRequestError(MessagesHelper.furnacesService.INFORM_NAME);
    if (!type)
      throw new BadRequestError(MessagesHelper.furnacesService.INFORM_TYPE);
    if (online == undefined)
      throw new BadRequestError(MessagesHelper.furnacesService.INFORM_ONLINE);
    if (!max_temperature)
      throw new BadRequestError(
        MessagesHelper.furnacesService.INFORM_MAX_TEMPERATURE
      );

    const result = await this.prisma.furnaces.findUnique({
      where: { ip_adress: ipAdress },
    });

    if (result)
      throw new BadRequestError(
        MessagesHelper.furnacesService.FURNACE_ALREADY_EXIST
      );

    return this.prisma.furnaces.create({
      data: {
        name,
        online,
        type,
        ip_adress: ipAdress,
        max_temperature,
      },
    });
  }

  async findAll(): Promise<FindAllFurnacesOutputDTO[]> {
    return this.prisma.furnaces.findMany({
      select: {
        id: true,
        name: true,
        ip_adress: true,
        type: true,
        online: true,
        max_temperature: true,
      },
    });
  }

  async findOne(ip_adress: string): Promise<FindOneFurnaceOutputDTO> {
    const result = await this.prisma.furnaces.findUnique({
      where: { ip_adress },
    });

    if (!result)
      throw new NotFoundError(MessagesHelper.furnacesService.FURNACE_NOT_EXIST);

    return result;
  }

  async update(
    data: CreateOrUpdateFurnaceInputDTO,
    ip_adress: string
  ): Promise<CreateOrUpdateFurnaceOutputDTO> {
    return this.prisma.furnaces.update({
      where: { ip_adress },
      data,
    });
  }

  async delete(ip_adress: string): Promise<void> {
    await this.prisma.furnaces.delete({ where: { ip_adress } });
  }
}
