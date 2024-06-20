"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saltPassword = void 0;
const md5_1 = __importDefault(require("md5"));
const saltPassword = (password, allSalt) => {
    if (allSalt == undefined) {
        let salt = new Date().getTime();
        allSalt = (0, md5_1.default)(`${salt}pop3`);
    }
    return {
        salt: allSalt,
        sPass: (0, md5_1.default)(allSalt + password)
    };
};
exports.saltPassword = saltPassword;
