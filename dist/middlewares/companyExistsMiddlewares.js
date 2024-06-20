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
exports.companyExistsMiddlewares = void 0;
const getCompanyInfo_1 = require("../utils/getCompanyInfo");
const errorModels_1 = require("../models/errorModels");
function companyExistsMiddlewares(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const [organization, err] = yield (0, getCompanyInfo_1.info)(req.body.organization);
        console.log(err);
        if (err || !organization) {
            return (0, errorModels_1.errorSend)(res, {
                organization: {
                    ru: ((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.status) == 504
                        ? "Лимит запросов привышен, обратитесь в поддержку!"
                        : "Некорректная организация!",
                    en: ((_b = err === null || err === void 0 ? void 0 : err.response) === null || _b === void 0 ? void 0 : _b.status) == 504
                        ? "The request limit has been exceeded, contact support!"
                        : "Incorrect organization!",
                },
            });
        }
        req.body.organization = organization.value;
        next();
    });
}
exports.companyExistsMiddlewares = companyExistsMiddlewares;
