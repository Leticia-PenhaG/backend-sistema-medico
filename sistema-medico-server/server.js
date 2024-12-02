const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg"); // Renombrado para consistencia con otros ejemplos

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Habilita CORS para permitir solicitudes desde diferentes orígenes
app.use(express.json()); // Analiza las solicitudes JSON
app.use(express.urlencoded({ extended: true })); // Analiza datos URL-encoded (formulario)

// Configuración de la base de datos
const pool = new Pool({
    user: "postgres",
    password: "12345678",
    database: "sistema_medico",
    host: "localhost",
    port: 5432,
    max: 10,
});

// Verifica la conexión con la base de datos al iniciar el servidor
pool.connect((err) => {
    if (err) {
        console.error("Error al conectar con la base de datos:", err);
        process.exit(1); // Termina la ejecución si la conexión falla
    }
    console.log("Conexión exitosa a la base de datos 'sistema_medico'.");
});

// Middleware para inyectar pool en req.db
app.use((req, res, next) => {
    req.db = pool; // Hace que el pool de conexión esté disponible en todas las rutas
    next();
});

// Rutas
const pacientesRouter = require("./routes/pacientes"); 
app.use("/pacientes", pacientesRouter);
const medicosRoutes = require("./routes/medicos"); 
app.use("/medicos", medicosRoutes);
const fichaRoutes = require("./routes/fichasClinicas"); 
app.use("/fichasClinicas", fichaRoutes);
const historialRoutes = require("./routes/historialClinico");
app.use("/historial", historialRoutes); 

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
