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
exports.getRangeFromS3 = exports.getFromS3 = exports.uploadToS3 = void 0;
const s3_1 = require("../config/s3");
function uploadToS3(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = new Promise((resolve, reject) => {
            s3_1.s3.upload(params, (err, data) => {
                console.log(err);
                if (err)
                    resolve(false);
                resolve(data);
            });
        });
        return yield result;
    });
}
exports.uploadToS3 = uploadToS3;
function getFromS3(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = new Promise((resolve, reject) => {
            s3_1.s3.getObject(params, (err, data) => {
                console.log(err);
                if (err)
                    resolve(false);
                resolve(data);
            });
        });
        return yield result;
    });
}
exports.getFromS3 = getFromS3;
function getRangeFromS3(req, res, options) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const headData = yield s3_1.s3.headObject(options).promise();
            const fileSize = (_a = headData.ContentLength) !== null && _a !== void 0 ? _a : 0;
            const contentType = headData.ContentType || "video/mp4";
            const range = (_b = req.headers.range) !== null && _b !== void 0 ? _b : "";
            const bytesPrefix = "bytes=";
            const parts = range.replace(bytesPrefix, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = end - start + 1;
            const stream = s3_1.s3
                .getObject(Object.assign(Object.assign({}, options), { Range: `bytes=${start}-${end}` }))
                .createReadStream();
            res.writeHead(206, {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunksize,
                "Content-Type": contentType,
            });
            stream.pipe(res);
        }
        catch (_c) {
            res.status(500).json({ err: 'Ошибка AWS' });
        }
    });
}
exports.getRangeFromS3 = getRangeFromS3;
