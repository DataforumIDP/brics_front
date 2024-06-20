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
exports.filesValidation = void 0;
const isNoArray_1 = require("../utils/isNoArray");
function filesValidation(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { files } = req;
        if (!files || Object.keys(files).length === 0)
            return sendError(res, 'Необходимо загрузить файл');
        const formatedFiles = Object.values(files).filter(isNoArray_1.isNotArray);
        if (typeNoAccept(formatedFiles))
            return sendError(res, 'Вы загружаете файл не разрешенного типа!');
        if (fileTooBig(formatedFiles))
            return sendError(res, 'Вы загружаете слишком большой файл!');
        return next();
    });
}
exports.filesValidation = filesValidation;
const acceptFileTypes = [
    "jpg",
    "jpeg",
    "pptx",
    "ppt",
    "docx",
    "doc",
    "odt",
    "odp",
    "pdf",
    "png",
    "mp4",
    "avi",
    "mkv"
];
function typeNoAccept(files) {
    return files.find((file) => {
        var _a;
        const fileType = (_a = file.name.split(".").pop()) !== null && _a !== void 0 ? _a : "";
        return (acceptFileTypes.indexOf(fileType) == -1) ? true : false;
    });
}
function fileTooBig(files) {
    return files.find((file) => {
        var _a;
        const fileSize = file.size;
        const fileType = (_a = file.name.split(".").pop()) !== null && _a !== void 0 ? _a : "";
        const sizeLimt = 1024 * 1024 * ((["mp4", "avi", "mkv"].includes(fileType)) ? 750 : 50);
        return (fileSize > sizeLimt) ? true : false;
    });
}
function sendError(res, text) {
    res.status(400).json({
        status: "error",
        error: text
    });
}
