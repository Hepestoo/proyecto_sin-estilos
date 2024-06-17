"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const database_1 = __importDefault(require("./database"));
const cors = require('cors');
app.use(cors());
app.use(express.json());
// CRUD
app.get('/consultar-mascotas', (req, res) => {
    database_1.default.query("select * from mascotas", (error, resultado) => {
        if (error) {
            throw error;
        }
        res.send(resultado.rows);
    });
});
app.get('/consultar-mascota', (req, res) => {
    database_1.default.query("select * from mascotas where id_mascota = $1", [req.query.id_mascota], (error, resultado) => {
        if (error) {
            throw error;
        }
        res.send(resultado.rows);
    });
});
app.get('/actualizar-mascota', (req, res) => {
    database_1.default.query("update mascotas set nombre=$1 , especie=$2, edad=$3, id_propietario =$4 where id_mascota=$5", [req.query.nombre, req.query.especie, req.query.edad, req.query.id_propietario, req.query.id_mascota], (error, resultado) => {
        if (error) {
            throw error;
        }
        res.send(resultado.rows);
    });
});
app.get('/crear-mascota', (req, res) => {
    database_1.default.query("insert into mascotas(nombre,especie,edad,id_propietario) values($1,$2,$3,$4)", [req.query.nombre, req.query.especie, req.query.edad, req.query.id_propietario], (error, resultado) => {
        if (error) {
            throw error;
        }
        res.send(resultado.rows);
    });
});
app.get('/eliminar-mascota', (req, res) => {
    database_1.default.query("delete from mascotas where id_mascota=$1", [req.query.id_mascota], (error, resultado) => {
        if (error) {
            throw error;
        }
        res.send(resultado.rows);
    });
});
app.listen(3000, () => console.log('server on port 3000'));
