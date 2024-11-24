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
    console.log(`Conexión exitosa a sistema_medico database`);
})

app.get("/pacientes",(req, res)=>{
    const sql = "SELECT * FROM pacientes";
    pool.query(sql,(err,result)=>{
        if(err) return res.json(err);
        return res.status(200).json(result.rows);
    })
})

app.get("/pacientes/:id",(req, res)=>{
    const pacienteId = Number(req.params.id);
    const sql = "SELECT * FROM pacientes WHERE id=$1";
    pool.query(sql,[pacienteId],(err,result)=>{
        if(err) return res.json(err);
        return res.status(200).json(result.rows[0]);
    })
})

app.post("/pacientes",(req, res)=>{
    const {nombre, apellido, cedula, email, telefono, fechaNacimiento} = req.body;
    const sql = "INSERT INTO pacientes(nombre, apellido, cedula, email, telefono, fechaNacimiento) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
    pool.query(sql,[nombre, apellido, cedula, email, telefono, fechaNacimiento],(err,result)=>{
        if(err) return res.json(err);
        return res.status(201).json(result.rows);
    })
})

app.patch("/pacientes/:id",(req, res)=>{
    const pacienteId = Number(req.params.id);
    const {nombre, apellido, cedula, email, telefono, fechaNacimiento} = req.body;
    const sql = "UPDATE pacientes SET nombre=$1, apellido=$2, cedula=$3, email=$4, telefono=$5, fechaNacimiento=$6 WHERE id=$6";
    pool.query(sql,[nombre, apellido, cedula, email, telefono, fechaNacimiento],(err,result)=>{
        if(err) return res.json(err);
        return res.status(200).send(`El paciente fue actualizado con éxito para el id:${pacienteId}`);
    })
})

app.patch("/Pacientes/:id",(req, res)=>{
    const pacienteId = Number(req.params.id);
    const sql = "DELETE FROM pacientes WHERE id=$1";
    pool.query(sql,[pacienteId],(err,result)=>{
        if(err) return res.json(err);
        return res.status(200).send(`El paciente fue eliminado con éxito para el id:${pacienteId}`);
    })
})