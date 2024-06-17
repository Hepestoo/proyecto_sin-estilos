"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const connectionDB = new pg_1.Pool({
    host: 'localhost',
    port: 5432,
    database: 'veterinaria_mascota',
    user: 'postgres',
    password: '0314',
});
connectionDB.connect();
console.log('conexión exitosa');
exports.default = connectionDB;
