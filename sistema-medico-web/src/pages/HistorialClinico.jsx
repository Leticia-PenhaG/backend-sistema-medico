import { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Paper, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";

const HistorialClinico = () => {
  const especialidades = [
    "Pediatra",
    "Dermatólogo",
    "Clínico",
    "Cardiólogo",
    "Neurólogo",
    "Oftalmólogo",
    "Ginecólogo",
    "Cirujano General",
    "Oncólogo",
    "Psiquiatra",
    "Radiólogo",
    "Ortopedista",
    "Endocrinólogo",
    "Reumatólogo",
    "Infectólogo",
  ];

  const [filters, setFilters] = useState({
    pacienteId: "",
    medicoId: "",
    fechaInicio: "",
    fechaFin: "",
    texto: "",
    especialidad: "",
  });

  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    // Obtener la lista de pacientes y médicos desde la API
    const fetchData = async () => {
      try {
        const pacientesResponse = await axios.get('http://localhost:3000/pacientes');
        setPacientes(pacientesResponse.data);

        const medicosResponse = await axios.get('http://localhost:3000/medicos');
        setMedicos(medicosResponse.data);
      } catch (err) {
        console.error('Error al obtener los datos:', err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activar indicador de carga
    try {
      const response = await axios.get('http://localhost:3000/historialClinico', { params: filters });
      setHistorial(response.data);
    } catch (err) {
      console.error('Error al buscar el historial clínico:', err);
    } finally {
      setLoading(false); // Desactivar indicador de carga
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
            {/* Desplegable de Paciente */}
            <FormControl fullWidth>
              <InputLabel id="paciente-label">Paciente</InputLabel>
              <Select
                labelId="paciente-label"
                label="Paciente"
                name="pacienteId"
                value={filters.pacienteId}
                onChange={handleChange}
              >
                {pacientes.map((paciente) => (
                  <MenuItem key={paciente.id} value={paciente.id}>
                    {paciente.nombre} {paciente.apellido}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Desplegable de Médico */}
            <FormControl fullWidth>
              <InputLabel id="medico-label">Médico</InputLabel>
              <Select
                labelId="medico-label"
                label="Médico"
                name="medicoId"
                value={filters.medicoId}
                onChange={handleChange}
              >
                {medicos.map((medico) => (
                  <MenuItem key={medico.id} value={medico.id}>
                    {medico.nombre} {medico.apellido} ({medico.especialidad})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Desplegable de Especialidad */}
            <FormControl fullWidth required>
              <InputLabel>Especialidad</InputLabel>
              <Select
                name="especialidad"
                value={filters.especialidad}
                onChange={handleChange}
              >
                {especialidades.map((esp) => (
                  <MenuItem key={esp} value={esp}>
                    {esp}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? "Buscando..." : "Buscar"}
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
                  Paciente: {ficha.paciente?.nombre} {ficha.paciente?.apellido} - Médico: {ficha.medico?.nombre} {ficha.medico?.apellido} ({ficha.medico?.especialidad})
                </Typography>
                <Typography variant="body2">Fecha: {ficha.fecha}</Typography>
                <Typography variant="body2">Motivo: {ficha.motivoConsulta}</Typography>
                <Typography variant="body2">Detalles: {ficha.detallesConsulta}</Typography>
                <Typography variant="body2">Diagnóstico: {ficha.diagnostico}</Typography>
                <Typography variant="body2">Tratamiento: {ficha.tratamiento}</Typography>
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
