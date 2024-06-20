"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputValidationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let errs = {};
        errors.array().map(item => {
            const { msg, path } = item;
            errs[path] = msg;
        });
        res.status(400).json({
            status: 'error',
            errors: errs
        });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
