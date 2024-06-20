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
exports.Qr = void 0;
const generateChar_1 = require("../utils/generateChar");
const queryBuilder_1 = require("../utils/queryBuilder");
const errorModels_1 = require("../models/errorModels");
class Qr {
    uploadNewQRs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const qrs = Array.from({ length: 100 }, () => (0, generateChar_1.generateChar)(50));
            const result = yield (0, queryBuilder_1.queryFromBd)(`/* SQL */ INSERT INTO qrs (code) SELECT unnest($1::text[]) RETURNING *`, [qrs]);
            if (!result)
                return (0, errorModels_1.dbError)(res, "#1001");
            res.json(result.rows);
        });
    }
}
exports.Qr = Qr;
