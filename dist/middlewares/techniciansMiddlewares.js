"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.techniciansMiddlewares = void 0;
const express_validator_1 = require("express-validator");
const attendeesMiddlewares_1 = require("./attendeesMiddlewares");
const companyExistsMiddlewares_1 = require("./companyExistsMiddlewares");
const inputValidationMiddleware_1 = require("./inputValidationMiddleware");
const techniciansUnexistsCheck_1 = require("./techniciansUnexistsCheck");
const activityMiddleware = (0, express_validator_1.body)("activity")
    .isLength({ min: 3, max: 80 })
    .withMessage({
    ru: "Вид деятельности может быть от 3-х до 80-ти символов!",
    en: "The type of activity can be from 3 to 80 characters!",
});
const passportMiddleware = (0, express_validator_1.body)("passport")
    .isLength({ min: 8, max: 20 })
    .withMessage({
    ru: "Некорректный номер паспорта!",
    en: "Incorrect passport number!",
});
exports.techniciansMiddlewares = [
    attendeesMiddlewares_1.nameMiddleware,
    attendeesMiddlewares_1.surnameMiddleware,
    attendeesMiddlewares_1.lastnameMiddleware,
    attendeesMiddlewares_1.organizationMiddleware,
    attendeesMiddlewares_1.gradeMiddleware,
    activityMiddleware,
    passportMiddleware,
    inputValidationMiddleware_1.inputValidationMiddleware,
    techniciansUnexistsCheck_1.techniciansUnexistsCheck,
    companyExistsMiddlewares_1.companyExistsMiddlewares,
];
