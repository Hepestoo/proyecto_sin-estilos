const express = require('express')
const app = express();
import connectionDB from './db/database';
const platosRouter = require('./modulos/plato');
const categoria = require('./modulos/categoria')
const orden = require('./modulos/orden')

const cors = require('cors')

app.use(cors());
app.use(express.json());
// testeo de ruta raiz
app.get('/',(q:any,r:any)=>{
    r.send('hola')
})
app.use('/plato', platosRouter);
app.use('/categoria',categoria)
app.use('/orden',orden)

app.listen(3000, () => console.log('server on port 3000'))
