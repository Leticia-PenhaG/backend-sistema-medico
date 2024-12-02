
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';

const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    especialidad: '',
    fechaInicio: '',
    fechaFin: '',
  });

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  const fetchEspecialidades = async () => {
    try {
      const response = await axios.get('http://localhost:3000/medicos');
      const uniqueEspecialidades = [...new Set(response.data.map((medico) => medico.especialidad))];
      setEspecialidades(uniqueEspecialidades);
    } catch (error) {
      console.error('Error al obtener especialidades:', error);
    }
  };

  const fetchHistorial = async () => {
    try {
      const response = await axios.get('http://localhost:3000/historial', { params: filters });
      setHistorial(response.data);
    } catch (error) {
      console.error('Error al obtener el historial:', error);
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Typography variant="h4">Historial de Consultas</Typography>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
        <TextField
          label="Buscar"
          name="search"
          value={filters.search}
          onChange={handleChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Especialidad</InputLabel>
          <Select
            name="especialidad"
            value={filters.especialidad}
            onChange={handleChange}
          >
            <MenuItem value="">Todas</MenuItem>
            {especialidades.map((esp, index) => (
              <MenuItem key={index} value={esp}>
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
        <Button variant="contained" onClick={fetchHistorial}>
          Buscar
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Paciente</TableCell>
            <TableCell>Médico</TableCell>
            <TableCell>Especialidad</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Detalles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {historial.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.paciente?.nombre} {item.paciente?.apellido}
              </TableCell>
              <TableCell>
                {item.medico?.nombre} {item.medico?.apellido}
              </TableCell>
              <TableCell>{item.medico?.especialidad}</TableCell>
              <TableCell>{new Date(item.fecha).toLocaleDateString()}</TableCell>
              <TableCell>{item.detallesConsulta}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Historial;

