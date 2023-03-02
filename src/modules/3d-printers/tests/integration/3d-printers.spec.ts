import { randomInt, randomUUID } from "crypto";
import { Express } from "express";
import { StatusCodes } from "http-status-codes";
import request, { SuperTest, Test } from "supertest";
import { createServer } from "../../../../server";
import { CreateOrUpdatePrinterInputDTO } from "../../dtos/create-printer-dto";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Printers Integration Tests", () => {
  let app: Express;
  let server: SuperTest<Test>;
  let printers: request.Response;

  beforeAll(async () => {
    app = createServer();
    server = request(app);
  });

  it("should be able to get all printers", async () => {
    printers = await server.get("/3d-printers");
    expect(printers.statusCode).toBe(StatusCodes.OK);
  });

  it("should be able to get an Printer", async () => {
    const ipAdress = printers.body[0].ip_adress;
    const response = await server.get(`/3d-printers/${ipAdress}`);

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body).toMatchObject(printers.body[0]);
  });

  it("should be able to create an Printer", async () => {
    const response = await server.post("/3d-printers").send({
      ip_adress: randomUUID(),
      name: "Printer Test " + randomInt(1000),
      online: true,
      type: "vida",
    } as CreateOrUpdatePrinterInputDTO);

    expect(response.statusCode).toEqual(StatusCodes.CREATED);
  });

  it("should be able to update printer name", async () => {
    const ipAdress = printers.body[0].ip_adress;
    const response = await server.put(`/3d-printers/name/${ipAdress}`).send({
      name: "Printer TestUpdateName",
    });
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body.updatedPrinter.name).toBe("Printer TestUpdateName");
  });

  it("should be able to update printer type", async () => {
    const ipAdress = printers.body[0].ip_adress;
    const response = await server.put(`/3d-printers/type/${ipAdress}`).send({
      type: "hello world type",
    });
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body.updatedPrinter.type).toBe("hello world type");
  });

  it("should be able to update printer ip_adress", async () => {
    const ipAdress = printers.body[0].ip_adress;
    const response = await server
      .put(`/3d-printers/ip-adress/${ipAdress}`)
      .send({
        ipAdress: "111.111.11111",
      });
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body.updatedPrinter.ip_adress).toBe("111.111.11111");
  });

  it("should be able to update hole the entire printer", async () => {
    const response = await server.put(`/3d-printers/111.111.11111`).send({
      ip_adress: "000.000.00",
      name: "Printer TestUpdate",
      online: false,
      type: "hello world",
    } as CreateOrUpdatePrinterInputDTO);
    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it("should be able to delete an printer", async () => {
    const ipAdress = printers.body[1].ip_adress;

    const response = await server.delete(`/3d-printers/${ipAdress}`);
    expect(response.statusCode).toBe(StatusCodes.NO_CONTENT);
  });

  it("should not find a printer and return error", async () => {
    const response = await server.get("/3d-printers/1221321");
    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });

  it("should be not able to create an printer", async () => {
    const response = await server.post("/3d-printers").send({
      ip_adress: "21321321321",
      name: "hello",
      type: "vida",
    } as CreateOrUpdatePrinterInputDTO);
    expect(response.body.message).toBe("please inform the online status");
    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
});
