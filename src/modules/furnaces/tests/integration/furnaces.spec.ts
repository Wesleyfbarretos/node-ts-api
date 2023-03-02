import { randomInt, randomUUID } from "crypto";
import { Express } from "express";
import { StatusCodes } from "http-status-codes";
import request, { SuperTest, Test } from "supertest";
import { MessagesHelper } from "../../../../helpers/messages-helper";
import { createServer } from "../../../../server";
import { CreateOrUpdateFurnaceInputDTO } from "../../dtos/create-furnace-dto";

describe("Furnace Integration Tests", () => {
  let app: Express;
  let server: SuperTest<Test>;
  let furnaces: request.Response;

  beforeAll(async () => {
    app = createServer();
    server = request(app);
  });

  it("should be able to create an Furnace", async () => {
    const response = await server.post("/furnaces").send({
      ip_adress: randomUUID(),
      name: "Furnace Test " + randomInt(1000),
      online: true,
      type: "vida",
      max_temperature: "1000C",
    } as CreateOrUpdateFurnaceInputDTO);
    expect(response.statusCode).toEqual(StatusCodes.CREATED);
  });

  it("should be able to get all Furnnaces", async () => {
    furnaces = await server.get("/furnaces");
    expect(furnaces.statusCode).toBe(StatusCodes.OK);
  });

  it("should be able to get an Furnace", async () => {
    const ipAdress = furnaces.body[0].ip_adress;
    const response = await server.get(`/furnaces/${ipAdress}`);

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body).toMatchObject(furnaces.body[0]);
  });

  it("should be able to update hole the entire Furnace", async () => {
    const ipAdress = furnaces.body[0].ip_adress;

    const response = await server.put(`/furnaces/${ipAdress}`).send({
      ip_adress: "000.000.00",
      name: "Furnace TestUpdate",
      online: false,
      type: "hello world",
      max_temperature: "2000C",
    } as CreateOrUpdateFurnaceInputDTO);
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body.updatedFurnace.ip_adress).toBe("000.000.00");
  });

  it("should be able to delete an Furnaces", async () => {
    const response = await server.delete(`/furnaces/000.000.00`);
    expect(response.statusCode).toBe(StatusCodes.NO_CONTENT);
  });

  it("should not find a Furnace and return error", async () => {
    const response = await server.get("/furnaces/1221321");
    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });

  it("should be not able to create an Furnace", async () => {
    const response = await server.post("/furnaces").send({
      ip_adress: "21321321321",
      name: "hello",
      type: "vida",
      online: false,
    } as CreateOrUpdateFurnaceInputDTO);
    expect(response.body.message).toBe(
      MessagesHelper.furnaceService.INFORM_MAX_TEMPERATURE
    );
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
});
