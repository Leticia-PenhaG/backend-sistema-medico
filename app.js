
/*const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const clinicalRecordsRoutes = require('./routes/clinicalRecords');

// Middleware
app.use(bodyParser.json()); 

// Usar las rutas para las fichas clínicas
app.use('/api', clinicalRecordsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/


const express = require('express');
const cors = require('cors');
const fichasClinicasRouter = require('./rutas/fichasClinicasRoutes');

const app = express();
app.use(cors()); 
app.use(express.json()); 

app.use('/api', clinicalRecordsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

