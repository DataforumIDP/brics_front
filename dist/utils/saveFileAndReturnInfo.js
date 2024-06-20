"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.saveFileAndReturnInfo = void 0;
const fs = __importStar(require("async-file"));
const db_1 = require("../config/db");
const generateChar_1 = require("./generateChar");
const s3_1 = require("./s3");
function saveFileAndReturnInfo(file, index) {
    return __awaiter(this, void 0, void 0, function* () {
        // Ваша логика обработки каждого файла
        const type = file.name.split(".")[file.name.split(".").length - 1];
        const genName = (0, generateChar_1.generateChar)(35) + "." + type;
        const filePath = global.uploadDir + "/" + genName;
        yield fs.writeFile(filePath, file.data);
        let info = {
            name: file.name,
            url: genName,
            timestamp: new Date().getTime(),
        };
        const params = {
            Bucket: 'galery.media',
            Key: `/${genName}`,
            Body: file.data
        };
        const s3Data = yield (0, s3_1.uploadToS3)(params);
        if (!s3Data)
            return { url: '', name: '' };
        try {
            yield db_1.db.query("INSERT INTO files (name, url, timestamp) VALUES ($1, $2, $3)", [file.name, genName, info.timestamp.toString()]);
        }
        catch (_a) {
            console.log("Ошибка сохранения файла в бд!");
        }
        return info;
    });
}
exports.saveFileAndReturnInfo = saveFileAndReturnInfo;
