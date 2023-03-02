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
exports.PrintersService = void 0;
class PrintersService {
    constructor(printersRepository) {
        this.printersRepository = printersRepository;
        this.printersRepository = printersRepository;
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("caiu no service");
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    update(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    updateName(name, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    updateIp(ip, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    updateType(type, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    updateOnlineStatus(online, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
}
exports.PrintersService = PrintersService;
