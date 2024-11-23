/*const express = require('express');
const sequelize = require('./config/database'); 
const app = express();
const Paciente = require("./models/Paciente");
const Medico = require("./models/Medico"); 
const pacienteRoutes = require("./routes/Pacientes");
const medicoRoutes = require("./routes/Medicos"); 

app.use("/api/pacientes", pacienteRoutes);
app.use("/api/medicos", medicoRoutes); 


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
    });*/

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const pacienteRoutes = require("./routes/Pacientes");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/pacientes", pacienteRoutes);

app.get('/', (req, res) => res.send('¡Bienvenido al sistema médico!'));

// Inicialización del servidor
const PORT = process.env.PORT || 5000;
sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos sincronizada.');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Error al sincronizar Sequelize:', err));
