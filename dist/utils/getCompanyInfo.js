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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = void 0;
const axios_1 = __importDefault(require("axios"));
function info(inn) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = [];
        let counter = 0;
        do {
            try {
                const response = (yield (0, axios_1.default)(`http://inn.wpdataforum.ru/?q=${inn}`)).data;
                result = [response === null || response === void 0 ? void 0 : response.suggestions[0], null];
            }
            catch (e) {
                result = [null, e];
            }
            counter++;
        } while (result[1] && counter != 5);
        return result;
    });
}
exports.info = info;
