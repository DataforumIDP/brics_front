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
exports.File = void 0;
const saveFileAndReturnInfo_1 = require("../utils/saveFileAndReturnInfo");
const isNoArray_1 = require("../utils/isNoArray");
const s3_1 = require("../utils/s3");
class File {
    upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.files || Object.keys(req.files).length === 0)
                return false;
            const files = Object.values(req.files).filter(isNoArray_1.isNotArray);
            const filePaths = yield Promise.all(files.map(saveFileAndReturnInfo_1.saveFileAndReturnInfo));
            return res.status(200).json({
                status: "ok",
                files: filePaths,
            });
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { file } = req.params;
            const fileType = (_a = file.split(".").at(-1)) !== null && _a !== void 0 ? _a : "";
            const params = {
                Bucket: "galery.media",
                Key: file,
            };
            if (req.headers.range)
                return yield (0, s3_1.getRangeFromS3)(req, res, params);
            const fileFromS3 = yield (0, s3_1.getFromS3)(params);
            if (!fileFromS3 || !fileFromS3.Body)
                return res.status(404).json({ status: "file not found!" });
            return res.send(fileFromS3.Body);
        });
    }
}
exports.File = File;
