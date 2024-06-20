"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNum = void 0;
const randomNum = (val = 1) => {
    let value = '';
    for (let i = 0; i < val; i++) {
        value = value + Math.floor(Math.random() * 10);
    }
    return value;
};
exports.randomNum = randomNum;
