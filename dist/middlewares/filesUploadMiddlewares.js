"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filesUploadMiddlewares = void 0;
const fileValidation_1 = require("./fileValidation");
const tokenAuthorizeCheck_1 = require("./tokenAuthorizeCheck");
exports.filesUploadMiddlewares = [
    tokenAuthorizeCheck_1.tokenAuthorizeCheck,
    fileValidation_1.filesValidation
];
