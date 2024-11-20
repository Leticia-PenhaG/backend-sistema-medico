const express = require('express');
const sequelize = require('./config/database'); // Ruta al archivo de config
const app = express();
const Paciente = require("./models/Paciente");
const pacienteRoutes = require("./routes/pacientes");

app.use("/api/pacientes", pacienteRoutes);

// Middlewares
app.use(express.json());

// Rutas (agrega tus endpoints aquí más adelante)
app.get('/', (req, res) => res.send('¡Bienvenido al sistema médico!'));

// Puerto
const PORT = process.env.PORT || 5000;

// Sincronizar Sequelize y arrancar el servidor
sequelize.sync({ force: false }) // Cambiar a true si deseas reiniciar tablas
    .then(() => {
        console.log('Base de datos sincronizada.');
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error al sincronizar Sequelize:', err);
    });
