import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';

const RegistroFichas = () => {
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [formData, setFormData] = useState({
    pacienteId: '',
    medicoId: '',
    fecha: new Date().toISOString().split('T')[0], // Fecha actual
    detallesConsulta: '',
    motivoConsulta: '',
    diagnostico: '',
    tratamiento: '',
  });

  useEffect(() => {
    // Cargar lista de pacientes
    axios.get('http://localhost:3000/pacientes').then((response) => {
      setPacientes(response.data);
    });
    // Cargar lista de médicos
    axios.get('http://localhost:3000/medicos').then((response) => {
      setMedicos(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/fichas', formData);
      alert(`Ficha registrada para paciente ID: ${response.data.pacienteId}`);
      setFormData({
        pacienteId: '',
        medicoId: '',
        fecha: new Date().toISOString().split('T')[0],
        detallesConsulta: '',
        motivoConsulta: '',
        diagnostico: '',
        tratamiento: '',
      });
    } catch (error) {
      console.error('Error al guardar ficha:', error);
      alert('No se pudo guardar la ficha médica.');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Registro de Fichas Médicas</Typography>
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Seleccionar Paciente"
            name="pacienteId"
            select
            value={formData.pacienteId}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          >
            {pacientes.map((paciente) => (
              <MenuItem key={paciente.id} value={paciente.id}>
                {paciente.nombre} {paciente.apellido}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Seleccionar Médico"
            name="medicoId"
            select
            value={formData.medicoId}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          >
            {medicos.map((medico) => (
              <MenuItem key={medico.id} value={medico.id}>
                {medico.nombre} {medico.apellido}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Fecha"
            name="fecha"
            type="date"
            value={formData.fecha}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Detalles de la Consulta"
            name="detallesConsulta"
            placeholder="Ingrese múltiples motivos separados por comas"
            value={formData.detallesConsulta}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Motivo de Consulta"
            name="motivoConsulta"
            value={formData.motivoConsulta}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Diagnóstico"
            name="diagnostico"
            value={formData.diagnostico}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tratamiento"
            name="tratamiento"
            value={formData.tratamiento}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Registrar Ficha
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RegistroFichas;
