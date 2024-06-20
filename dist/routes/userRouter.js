"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const usersController_1 = require("../controllers/usersController");
const usersFromExelMiddlewares_1 = require("../middlewares/usersFromExelMiddlewares");
const attendeesMiddlewares_1 = require("../middlewares/attendeesMiddlewares");
const techniciansMiddlewares_1 = require("../middlewares/techniciansMiddlewares");
exports.userRouter = (0, express_1.default)();
if (!fs_1.default.existsSync(global.uploadDir)) {
    fs_1.default.mkdirSync(global.uploadDir);
}
exports.userRouter.use(express_1.default.json());
const user = new usersController_1.User();
exports.userRouter.use((0, express_fileupload_1.default)({
    defCharset: "utf-8",
    defParamCharset: "utf-8",
}));
exports.userRouter.post("/from-exel", usersFromExelMiddlewares_1.usersFromExelMiddlewares, user.regFromExel);
exports.userRouter.post("/attendees", attendeesMiddlewares_1.attendeesMiddlewares, user.regAttendees);
exports.userRouter.post("/technicians", techniciansMiddlewares_1.techniciansMiddlewares, user.regTechnicians);
