import { Pool } from "pg";

const connectionDB = new Pool({
    host: 'localhost', 
    port: 5432, 
    database: 'proyecto',
    user: 'postgres',
    password: '12345',
})

connectionDB.connect();
console.log('conexión exitosa')

export default connectionDB;