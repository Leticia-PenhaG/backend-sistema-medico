const express = require('express');
const sequelize = require('./config/database'); 
const app = express();
const Paciente = require("./models/Paciente");
const Medico = require("./models/Medico"); 
const pacienteRoutes = require("./routes/Pacientes");
const medicoRoutes = require("./routes/Medicos"); 

app.use("/api/pacientes", pacienteRoutes);
app.use("/api/medicos", medicoRoutes); 

// Middlewares
app.use(express.json());

app.get('/', (req, res) => res.send('¡Bienvenido al sistema médico!'));


const PORT = process.env.PORT || 5000;


sequelize.sync({ force: false }) 
    .then(() => {
        console.log('Base de datos sincronizada.');
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error al sincronizar Sequelize:', err);
    });
