"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const { DB_BR_USER, DB_BR_PASSWORD, DB_BR_HOST, DB_BR_NAME } = process.env;
exports.db = new pg_1.Pool({
    user: DB_BR_USER,
    password: DB_BR_PASSWORD,
    host: DB_BR_HOST,
    port: 5432,
    database: DB_BR_NAME
});
