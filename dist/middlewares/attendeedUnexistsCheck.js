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
exports.attendeedUnexistsCheck = void 0;
const errorModels_1 = require("../models/errorModels");
const queryBuilder_1 = require("../utils/queryBuilder");
function attendeedUnexistsCheck(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { mail } = req.body;
        const result = yield (0, queryBuilder_1.queryFromBd)(`/* SQL */ SELECT id FROM attendees WHERE mail=$1`, [mail]);
        if (result === null || result === void 0 ? void 0 : result.rowCount)
            return (0, errorModels_1.errorSend)(res, {
                mail: {
                    ru: "Почта уже занята!",
                    en: "The mail is already occupied!",
                },
            });
        next();
    });
}
exports.attendeedUnexistsCheck = attendeedUnexistsCheck;
