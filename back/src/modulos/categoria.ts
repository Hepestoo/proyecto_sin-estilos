const express = require('express');
const categoria = express.Router();
import e from 'express';
import connectionDB from '../db/database';
// Ruta para manejar platos
categoria.post('/', (req:any, res:any) => {
const categoria = req.body.nombre


 connectionDB.query('INSERT INTO categoria(nombre)VALUES($1)',[categoria],(r:any)=>{
    if(r){
        console.error(r)
        res.status(400).send({ message: 'categoria', data: req.body });
    }
    res.send('categoria creado')
 })
});

categoria.get('/', (req:any, res:any) => {
    const categoria = req.body.nombre
    
    
     connectionDB.query('SELECT * FROM categoria',(r:any,reso:any)=>{
        if(r){
            console.error(r)
            res.status(400).send({ message: 'categoria', data: req.body });
        }
        res.send(reso.rows)
     })
    });

    categoria.delete('/:id', (req:any, res:any) => {
        
         connectionDB.query('DELETE FROM categoria WHERE id =$1',[req.params.id],(r:any)=>{
            if(r){
                console.error(r)
                res.status(400).send({ message: 'categoria', data: req.body });
            }
            res.send('eliminado exitosamente')
         })
        });

module.exports = categoria;
