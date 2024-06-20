"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendeesMiddlewares = exports.gradeMiddleware = exports.organizationMiddleware = exports.lastnameMiddleware = exports.surnameMiddleware = exports.nameMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputValidationMiddleware_1 = require("./inputValidationMiddleware");
const companyExistsMiddlewares_1 = require("./companyExistsMiddlewares");
const attendeedUnexistsCheck_1 = require("./attendeedUnexistsCheck");
exports.nameMiddleware = (0, express_validator_1.body)("name")
    .isLength({ min: 3, max: 30 })
    .withMessage({
    ru: "Длина Имени от 3-х до 30-ти символов!",
    en: "The length of the Name is from 3 to 30 characters!",
});
exports.surnameMiddleware = (0, express_validator_1.body)("surname")
    .isLength({ min: 3, max: 30 })
    .withMessage("Длина Фамилии от 3-х до 30-ти символов!");
exports.lastnameMiddleware = (0, express_validator_1.body)("lastname")
    .optional()
    .isLength({ min: 3, max: 30 })
    .withMessage("Длина Отчества от 3-х до 50-ти символов!");
exports.organizationMiddleware = (0, express_validator_1.body)("organization")
    .isLength({ min: 3, max: 20 })
    .withMessage("Некорректная организация!");
exports.gradeMiddleware = (0, express_validator_1.body)("grade")
    .isLength({ min: 3, max: 60 })
    .withMessage("Длина Должности от 3-х до 60-ти символов!");
const mailMiddleware = (0, express_validator_1.body)("mail")
    .isEmail()
    .withMessage("Некорректная почта!");
const phoneMiddleware = (0, express_validator_1.body)("phone")
    .isLength({ min: 3, max: 30 })
    .custom(notHasLetters)
    .withMessage("Некорректный номер телефона!");
const countryMiddleware = (0, express_validator_1.body)("country")
    .isLength({ min: 2, max: 60 })
    .withMessage("Длина названия Страны от 2-х до 60-ти символов");
const cityMiddleware = (0, express_validator_1.body)("city")
    .isLength({ min: 2, max: 60 })
    .withMessage("Длина названия Города от 2-х до 60-ти символов");
function notHasLetters(item) {
    return /^[0-9+\-()]*$/.test(item);
}
exports.attendeesMiddlewares = [
    exports.nameMiddleware,
    exports.surnameMiddleware,
    exports.lastnameMiddleware,
    exports.organizationMiddleware,
    exports.gradeMiddleware,
    mailMiddleware,
    phoneMiddleware,
    countryMiddleware,
    cityMiddleware,
    inputValidationMiddleware_1.inputValidationMiddleware,
    attendeedUnexistsCheck_1.attendeedUnexistsCheck,
    companyExistsMiddlewares_1.companyExistsMiddlewares,
];
