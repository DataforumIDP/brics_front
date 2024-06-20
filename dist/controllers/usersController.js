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
exports.insertTechnicians = exports.insertAttendees = exports.User = void 0;
const isNoArray_1 = require("../utils/isNoArray");
const tableFromExcel_1 = require("../utils/tableFromExcel");
const db_1 = require("../config/db");
const errorModels_1 = require("../models/errorModels");
class User {
    regFromExel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.files || !req.files.file)
                return res.status(400).json({ error: "Нет файла" });
            const { file } = req.files;
            if (!(0, isNoArray_1.isNotArray)(file))
                return res
                    .status(400)
                    .json({ error: "Невозможна загрузка нескольких файлов" });
            const table = yield (0, tableFromExcel_1.getTableFromExcel)(file);
            if (!table)
                return (0, errorModels_1.errorSend)(res, { error: "excel reading error" });
            const validationResult = table.every(validationTechnicianData);
            if (!validationResult)
                return (0, errorModels_1.errorSend)(res, { file: "Ошибка в обработки файла!" });
            const insertPromises = table.map((item) => __awaiter(this, void 0, void 0, function* () {
                return yield insertTechnicians(Object.assign(Object.assign({}, item), { timestamp: new Date().getTime() }));
            }));
            yield Promise.all(insertPromises);
            res.status(201).json({ table });
        });
    }
    regAttendees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const timestamp = new Date().getTime();
            const [result, error] = yield insertAttendees(Object.assign(Object.assign({}, data), { timestamp }));
            if (error)
                return (0, errorModels_1.dbError)(res, "#7003");
            res.json(result);
        });
    }
    regTechnicians(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const timestamp = new Date().getTime();
            const [result, error] = yield insertTechnicians(Object.assign(Object.assign({}, data), { timestamp }));
            console.log(error);
            if (error)
                return (0, errorModels_1.dbError)(res, "#7004");
            res.json(result);
        });
    }
}
exports.User = User;
function insertAttendees(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db_1.db.connect();
        const { name, surname, lastname = "", organization, grade, mail, phone, country, city, timestamp, } = data;
        try {
            yield client.query("BEGIN");
            const insertResult = yield client.query(`/* SQL */ 
            INSERT INTO attendees 
            (name, surname, lastname, organization, grade, mail, phone, country, city, code, timestamp) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, (SELECT id FROM qrs WHERE used = false LIMIT 1 FOR UPDATE), $10) 
            RETURNING *`, [
                name,
                surname,
                lastname,
                organization,
                grade,
                mail,
                phone.trim(),
                country,
                city,
                timestamp.toString(),
            ]);
            const user = insertResult.rows[0];
            yield client.query(`/* SQL */ 
            UPDATE qrs
            SET used=true
            WHERE id=$1`, [user.code]);
            yield client.query("COMMIT");
            return [user, null];
        }
        catch (e) {
            yield client.query("ROLLBACK");
            return [null, e];
        }
        finally {
            client.release();
        }
    });
}
exports.insertAttendees = insertAttendees;
function insertTechnicians(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db_1.db.connect();
        const { name, surname, lastname = "", organization, grade, activity, passport, timestamp, } = data;
        try {
            yield client.query("BEGIN");
            const insertResult = yield client.query(`/* SQL */ 
            INSERT INTO technicians 
            (name, surname, lastname, organization, grade, activity, passport, code, timestamp) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, (SELECT id FROM qrs WHERE used = false LIMIT 1 FOR UPDATE), $8) 
            RETURNING *`, [
                name,
                surname,
                lastname,
                organization,
                grade,
                activity,
                passport,
                timestamp.toString(),
            ]);
            const user = insertResult.rows[0];
            yield client.query(`/* SQL */ 
            UPDATE qrs
            SET used=true
            WHERE id=$1`, [user.code]);
            yield client.query("COMMIT");
            return [user, null];
        }
        catch (e) {
            yield client.query("ROLLBACK");
            return [null, e];
        }
        finally {
            client.release();
        }
    });
}
exports.insertTechnicians = insertTechnicians;
function validationTechnicianData(item) {
    const { name, surname, lastname, organization, grade, activity, passport } = item;
    if (!name || name.length < 2 || name.length > 30)
        return false;
    if (!surname || surname.length < 2 || surname.length > 30)
        return false;
    if (!!lastname && (lastname.length < 2 || lastname.length > 30))
        return false;
    if (!organization || organization.length < 2 || organization.length > 40)
        return false;
    if (!grade || grade.length < 2 || grade.length > 40)
        return false;
    if (!activity || activity.length < 2 || activity.length > 40)
        return false;
    if (!passport || passport.length < 6 || passport.length > 20)
        return false;
    return true;
}
