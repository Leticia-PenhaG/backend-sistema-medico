import { useState } from "react";
import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";

const HistorialClinico = () => {
  const [formData, setFormData] = useState({
    pacienteId: "",
    fecha: "",
    diagnostico: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del historial clínico:", formData);
    // Aquí iría la lógica para enviar los datos, como axios.post() a tu API
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Historial Clínico
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="ID del Paciente"
              name="pacienteId"
              value={formData.pacienteId}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Fecha"
              name="fecha"
              type="date"
              value={formData.fecha}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Diagnóstico"
              name="diagnostico"
              value={formData.diagnostico}
              onChange={handleChange}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Registrar Historial
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default HistorialClinico;
