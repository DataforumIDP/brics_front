"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatedPhone = void 0;
function formatedPhone(tel) {
    tel = tel.replace(/[^\d]/g, '');
    if (tel.length == 11) {
        return tel.slice(1);
    }
    else
        return tel;
}
exports.formatedPhone = formatedPhone;
