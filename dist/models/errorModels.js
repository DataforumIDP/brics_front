"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorSend = exports.dbError = exports.authError = void 0;
function authError(res) {
    return errorSend(res, { authorize: "Требуется авторизация!", }, { code: 401 });
}
exports.authError = authError;
;
function dbError(res, slag = "#777!") {
    return errorSend(res, { db: `Ошибка базы данных ${slag}`, }, { code: 500 });
}
exports.dbError = dbError;
function errorSend(res, data, options = { code: 400 }) {
    return res.status(options.code).json({ errors: data });
}
exports.errorSend = errorSend;
