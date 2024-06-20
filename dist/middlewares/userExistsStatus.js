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
exports.userExistsStatus = void 0;
/**
 *
 * @param options - Объект парметров
 * @param exists - Параметр, отвечающий за то, должен ли существовать пользователь
 * @returns
 */
function userExistsStatus(options) {
    return function (
    // req: UserCreateRequest,
    res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { phone } = req.body
            // const result = await queryFromBd(res, `/* SQL */ SELECT id FROM users WHERE phone=$1`, [formatedPhone(phone)])
            // if (result === undefined) return
            // return !!result.rowCount == options.exists
            //     ? next()
            //     : res.status(400).json({
            //           status: "error",
            //           errors: {
            //               phone: options.exists
            //                 ? "Пользователь ещё не создан!"
            //                 : "Номер телефона занят!"
            //           },
            //       });
        });
    };
}
exports.userExistsStatus = userExistsStatus;
