
import { useState } from "react";
import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";
import axios from "axios";

const HistorialClinico = () => {
  const [filters, setFilters] = useState({
    pacienteId: "",
    medicoId: "",
    fechaInicio: "",
    fechaFin: "",
    texto: "",
    especialidad: "",
  });

  const [historial, setHistorial] = useState([]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/historialClinico', { params: filters });
      setHistorial(response.data);
    } catch (err) {
      console.error('Error al buscar el historial clínico:', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Buscar Historial Clínico
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="ID del Paciente"
              name="pacienteId"
              value={filters.pacienteId}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="ID del Médico"
              name="medicoId"
              value={filters.medicoId}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Especialidad"
              name="especialidad"
              value={filters.especialidad}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Fecha Inicio"
              name="fechaInicio"
              type="date"
              value={filters.fechaInicio}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Fecha Fin"
              name="fechaFin"
              type="date"
              value={filters.fechaFin}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Texto en Detalles"
              name="texto"
              value={filters.texto}
              onChange={handleChange}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
              Buscar
            </Button>
          </Box>
        </form>
      </Paper>
      <Box mt={4}>
        <Typography variant="h5">Resultados:</Typography>
        {historial.length > 0 ? (
          <Paper sx={{ padding: 2, marginTop: 2 }}>
            {historial.map((ficha) => (
              <Box key={ficha.id} sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1">
                  Paciente: {ficha.paciente?.nombre} - Médico: {ficha.medico?.nombre} ({ficha.medico?.especialidad})
                </Typography>
                <Typography variant="body2">Fecha: {ficha.fecha}</Typography>
                <Typography variant="body2">Detalles: {ficha.detallesConsulta}</Typography>
              </Box>
            ))}
          </Paper>
        ) : (
          <Typography variant="body2">No se encontraron resultados</Typography>
        )}
      </Box>
    </Container>
  );
};

export default HistorialClinico;

/*
import { useState } from "react";
import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";
import axios from "axios";

const HistorialClinico = () => {
  const [filters, setFilters] = useState({
    pacienteId: "",
    medicoId: "",
    fechaInicio: "",
    fechaFin: "",
    texto: "",
    especialidad: "",
  });

  const [historial, setHistorial] = useState([]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/historial', { params: filters });
      setHistorial(response.data);
    } catch (err) {
      console.error('Error al buscar el historial clínico:', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Historial de Consultas
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="ID del Paciente"
              name="pacienteId"
              value={filters.pacienteId}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="ID del Médico"
              name="medicoId"
              value={filters.medicoId}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Especialidad del Médico"
              name="especialidad"
              value={filters.especialidad}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Fecha Inicio"
              name="fechaInicio"
              type="date"
              value={filters.fechaInicio}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Fecha Fin"
              name="fechaFin"
              type="date"
              value={filters.fechaFin}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Buscar en Detalles de Consulta"
              name="texto"
              value={filters.texto}
              onChange={handleChange}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
              Buscar
            </Button>
          </Box>
        </form>
      </Paper>
      <Box mt={4}>
        <Typography variant="h5">Resultados</Typography>
        {historial.length > 0 ? (
          <Paper sx={{ padding: 2, marginTop: 2 }}>
            {historial.map((ficha) => (
              <Box key={ficha.id} sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1">
                  Paciente: {ficha.paciente?.nombre} - Médico: {ficha.medico?.nombre} ({ficha.medico?.especialidad})
                </Typography>
                <Typography variant="body2">Fecha: {ficha.fecha}</Typography>
                <Typography variant="body2">Detalles: {ficha.detallesConsulta}</Typography>
              </Box>
            ))}
          </Paper>
        ) : (
          <Typography variant="body2">No se encontraron resultados.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default HistorialClinico;

*/
