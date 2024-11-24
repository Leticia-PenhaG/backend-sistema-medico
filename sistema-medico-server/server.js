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


