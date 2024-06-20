"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasInLangs = void 0;
const accessLangs = [
    'ru',
    'uz',
    'tj',
];
function hasInLangs(lang) {
    return accessLangs.includes(lang);
}
exports.hasInLangs = hasInLangs;
