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
exports.queryFromBd = void 0;
const db_1 = require("../config/db");
function queryFromBd(query_1) {
    return __awaiter(this, arguments, void 0, function* (query, args = []) {
        try {
            const res = yield db_1.db.query(query, args);
            return res;
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.queryFromBd = queryFromBd;
