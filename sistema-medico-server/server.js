const express = require('express');
const cors = require('cors');
const postgresPool = require('pg').Pool;

const app = express();
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})

const pool = new postgresPool({
    user:"postgres",
    password:"12345678",
    database:"sistema_medico",
    host:"localhost",
    port:5432,
    max:10
})

pool.connect((err, connection)=>{ 
    if(err) throw err;
    console.log(`Conexión correcta a sistema_medico database`);
})


