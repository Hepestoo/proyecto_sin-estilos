const express = require('express');
const orden = express.Router();
import connectionDB from '../db/database';

orden.post('/', (req:any, res:any) => {
    const mesa_orden = req.body.mesa;
    const platos:any[] = req.body.platos; 

    const fechaActual = new Date();

    connectionDB.query('INSERT INTO orden (mesa, estado, fecha_emision) VALUES ($1, TRUE, $2) RETURNING id', [mesa_orden, fechaActual], (error:any, result:any) => {
        if (error) {
            console.error('Error al insertar en la base de datos:', error);
            return res.status(400).send({ message: 'Error al insertar en la base de datos', error });
        } 

        const orderId = result.rows[0].id;

        const detalleValues = platos.map((plato:any) => [orderId, plato]);

        
        detalleValues.forEach((detalle:any) => {
            connectionDB.query("INSERT INTO detalle_orden (fk_factura, fk_plato) VALUES ($1, $2)", detalle, (err:Error) => {
                if (err) {
                    console.error('Error al insertar detalle de orden:', err);
                    
                }
            });
        });

        res.status(201).json({ message: 'Orden creada', orderId });
    });
});

orden.get('/', (req:any, res:any) => {
    connectionDB.query('SELECT * FROM orden', (error:any, result:any) => {
        if (error) {
            console.error('Error al obtener las órdenes:', error);
            return res.status(400).send({ message: 'Error al obtener las órdenes', error });
        } 
        res.status(200).json(result.rows);
    });
});


orden.get('/:id', (req:any, res:any) => {

    connectionDB.query('SELECT fk_plato FROM detalle_orden WHERE fk_factura =$1',[req.params.id], (error:any, result:any) => {
        if (error) {
            console.error('Error al obtener las órdenes:', error);
            return res.status(400).send({ message: 'Error al obtener las órdenes', error });
        } 
        res.status(200).json(result.rows);
    });
});


module.exports = orden;
