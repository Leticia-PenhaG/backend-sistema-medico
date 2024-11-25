const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const postgresPool = require("pg").Pool;

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la base de datos
const pool = new postgresPool({
    user: "postgres",
    password: "12345678",
    database: "sistema_medico",
    host: "localhost",
    port: 5432,
    max: 10,
});

pool.connect((err) => {
    if (err) {
        console.error("Error al conectar con la base de datos:", err);
        process.exit(1);
    }
    console.log("Conexión exitosa a la base de datos 'sistema_medico'.");
});

// Middleware para inyectar pool en req.db
app.use((req, res, next) => {
    req.db = pool;
    next();
});

// Importar y montar el router de pacientes
const pacientesRouter = require("./routes/pacientes"); 
app.use("/pacientes", pacientesRouter);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
