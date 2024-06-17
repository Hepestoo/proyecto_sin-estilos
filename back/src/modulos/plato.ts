const express = require('express');
const plato = express.Router();
import connectionDB from '../db/database';
// Ruta para manejar platos
plato.get('/', (req:any, res:any) => {
    connectionDB.query("select * from plato", (error: any, resultado: { rows: any; }) => {
        if (error) {
            res.status(400).send({ message: 'plato', data: req.body });
            
        }

        res.send(resultado.rows);
    });

});
plato.get('/:id', (req:any, res:any) => {
    connectionDB.query("select * from plato WHERE id = $1",[req.params.id], (error: any, resultado: { rows: any; }) => {
        if (error) {
            res.status(400).send({ message: 'plato', data: req.body });

        }

        res.send(resultado.rows);
    });

});

plato.delete('/:id', (req: any, res: any) => {
    const id = req.params.id;

    connectionDB.query("DELETE FROM plato WHERE id = $1", [id], (error: any) => {
        if (error) {
            console.error('Error al eliminar el plato:', error);
            return res.status(400).send({ message: 'Error al eliminar el plato', error });
        }

        // Si la eliminación fue exitosa, envía una respuesta de éxito
        res.status(201).json({ message: 'Plato eliminado correctamente' });
    });
});


plato.post('/', (req:any, res:any) => {
    const plato = { nombre: req.body.nombre, precio: req.body.precio, description: req.body.description, categoria: req.body.categoria };
    
    connectionDB.query("INSERT INTO PLATO(nombre,precio,description,fk_categoria) VALUES($1,$2,$3,$4)", 
    [plato.nombre, parseFloat(plato.precio), plato.description, plato.categoria], 
    (error, resultado) => {
        if (error) {
            return res.status(400).send({ message: 'Error al crear el plato', error: error });
        }

        res.status(201).send({ message: 'Plato creado con éxito', data: plato });
    });
});

plato.put('/:id', (req:any, res:any) => {
    const plato = { nombre: req.body.nombre, precio: req.body.precio, description: req.body.description, categoria: req.body.categoria };
    const plato_id = req.params.id
    connectionDB.query("UPDATE PLATO SET nombre = $1, precio = $2, description = $3, fk_categoria = $4 WHERE id =$5", 
    [plato.nombre, parseFloat(plato.precio), plato.description, plato.categoria,plato_id], 
    (error, resultado) => {
        if (error) {
            return res.status(400).send({ message: 'Error al crear el plato', error: error });
        }

        res.status(201).send({ message: 'Plato creado con éxito', data: plato });
    });
});


module.exports = plato;
