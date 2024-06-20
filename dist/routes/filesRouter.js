"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesRouter = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const filesController_1 = require("../controllers/filesController");
const filesUploadMiddlewares_1 = require("../middlewares/filesUploadMiddlewares");
exports.filesRouter = (0, express_1.default)();
if (!fs_1.default.existsSync(global.uploadDir)) {
    fs_1.default.mkdirSync(global.uploadDir);
}
exports.filesRouter.use(express_1.default.json());
const fileController = new filesController_1.File();
exports.filesRouter.use((0, express_fileupload_1.default)({
    defCharset: 'utf-8',
    defParamCharset: 'utf-8'
}));
exports.filesRouter.post('/', filesUploadMiddlewares_1.filesUploadMiddlewares, fileController.upload);
exports.filesRouter.get('/:file', fileController.get);
