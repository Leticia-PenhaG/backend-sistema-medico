
const express = require('express');
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
});
