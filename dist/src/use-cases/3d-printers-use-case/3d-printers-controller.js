"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintersController = void 0;
class PrintersController {
    constructor(printersService) {
        this.printersService = printersService;
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            return yield this.printersService.create(body);
        });
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.printersService.findAll();
        });
        this.findOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            return yield this.printersService.findOne(id);
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const { id } = req.params;
            return yield this.printersService.update(body, id);
        });
        this.updateName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const { id } = req.params;
            return yield this.printersService.updateName(name, id);
        });
        this.updateIp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { ipAdress } = req.body;
            const { id } = req.params;
            return yield this.printersService.updateIp(ipAdress, id);
        });
        this.updateType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { type } = req.body;
            const { id } = req.params;
            return yield this.printersService.updateType(type, id);
        });
        this.updateOnlineStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { online } = req.body;
            const { id } = req.params;
            return yield this.printersService.updateOnlineStatus(online, id);
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield this.printersService.delete(id);
        });
        this.printersService = printersService;
    }
}
exports.PrintersController = PrintersController;
