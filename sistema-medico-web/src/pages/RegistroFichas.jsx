import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Container,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const RegistroFichas = () => {
  const [setFichas] = useState([]);
  const [formData, setFormData] = useState({
    pacienteId: "",
    medicoId: "",
    fechaConsulta: "",
    diagnostico: "",
    tratamiento: "",
  });
  const [search, setSearch] = useState("");

  const fetchFichas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/fichas");
      setFichas(response.data);
    } catch (error) {
      console.error("Error al obtener fichas:", error);
    }
  };

  useEffect(() => {
    fetchFichas();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/fichas", formData);
      alert(`Ficha registrada: ${response.data.pacienteId}`);
      setFormData({
        pacienteId: "",
        medicoId: "",
        fechaConsulta: "",
        diagnostico: "",
        tratamiento: "",
      });
      fetchFichas();
    } catch (error) {
      console.error("Error al guardar ficha:", error);
      alert("No se pudo guardar la ficha médica.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Registro de Fichas Médicas
      </Typography>
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">Registrar Ficha Médica</Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <TextField
              label="Paciente ID"
              name="pacienteId"
              value={formData.pacienteId}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Médico ID"
              name="medicoId"
              value={formData.medicoId}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Fecha de Consulta"
              name="fechaConsulta"
              type="date"
              value={formData.fechaConsulta}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Diagnóstico"
              name="diagnostico"
              value={formData.diagnostico}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Tratamiento"
              name="tratamiento"
              value={formData.tratamiento}
              onChange={handleChange}
              required
              fullWidth
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Registrar Ficha Médica
          </Button>
        </form>
      </Paper>

      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6">Listado de Fichas Médicas</Typography>
        <TextField
          label="Buscar por ID de paciente o médico"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        {/* Similar al código de médicos, aquí puedes agregar una tabla para las fichas */}
      </Paper>
    </Container>
  );
};

export default RegistroFichas;
