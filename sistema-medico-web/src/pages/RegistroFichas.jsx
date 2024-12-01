import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import axios from "axios";

const RegistroFichas = () => {
  const [fichas, setFichas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [formData, setFormData] = useState({
    pacienteId: "",
    medicoId: "",
    fecha: new Date().toISOString().split("T")[0],
    detallesConsulta: "",
    motivoConsulta: "",
    diagnostico: "",
    tratamiento: "",
  });
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchFichas();
    fetchPacientes();
    fetchMedicos();
  }, []);

  const fetchFichas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/fichas");
      setFichas(response.data);
    } catch (error) {
      console.error("Error al obtener fichas:", error);
    }
  };

  const fetchPacientes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/pacientes");
      setPacientes(response.data);
    } catch (error) {
      console.error("Error al obtener pacientes:", error);
    }
  };

  const fetchMedicos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/medicos");
      setMedicos(response.data);
    } catch (error) {
      console.error("Error al obtener médicos:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.patch(`http://localhost:3000/fichas/${editId}`, formData);
        alert("Ficha actualizada con éxito!");
      } else {
        await axios.post("http://localhost:3000/fichas", formData);
        alert("Ficha registrada con éxito!");
      }
      setFormData({
        pacienteId: "",
        medicoId: "",
        fecha: new Date().toISOString().split("T")[0],
        detallesConsulta: "",
        motivoConsulta: "",
        diagnostico: "",
        tratamiento: "",
      });
      setIsEditing(false);
      setEditId(null);
      fetchFichas();
    } catch (error) {
      console.error("Error al guardar ficha:", error);
      alert("No se pudo guardar la ficha médica.");
    }
  };

  const handleEdit = (ficha) => {
    setFormData(ficha);
    setIsEditing(true);
    setEditId(ficha.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/fichas/${id}`);
      fetchFichas();
    } catch (error) {
      console.error("Error al eliminar ficha:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Registro de Fichas Médicas</Typography>
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">{isEditing ? "Editar Ficha" : "Registrar Ficha"}</Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <TextField
              label="Paciente"
              name="pacienteId"
              select
              value={formData.pacienteId}
              onChange={handleChange}
              required
              fullWidth
            >
              {pacientes.map((paciente) => (
                <MenuItem key={paciente.id} value={paciente.id}>
                  {paciente.nombre} {paciente.apellido}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Médico"
              name="medicoId"
              select
              value={formData.medicoId}
              onChange={handleChange}
              required
              fullWidth
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
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Detalles de Consulta"
              name="detallesConsulta"
              value={formData.detallesConsulta}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Motivo de Consulta"
              name="motivoConsulta"
              value={formData.motivoConsulta}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Diagnóstico"
              name="diagnostico"
              value={formData.diagnostico}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Tratamiento"
              name="tratamiento"
              value={formData.tratamiento}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
            {isEditing ? "Actualizar Ficha" : "Registrar Ficha"}
          </Button>
        </form>
      </Paper>

      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6">Listado de Fichas Médicas</Typography>
        <TextField
          label="Buscar por paciente o médico"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Paciente</TableCell>
              <TableCell>Médico</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Motivo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fichas
              .filter(
                (ficha) =>
                  pacientes.find((p) => p.id === ficha.pacienteId)?.nombre
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  medicos.find((m) => m.id === ficha.medicoId)?.nombre
                    .toLowerCase()
                    .includes(search.toLowerCase())
              )
              .map((ficha) => (
                <TableRow key={ficha.id}>
                  <TableCell>
                    {
                      pacientes.find((paciente) => paciente.id === ficha.pacienteId)?.nombre
                    }
                  </TableCell>
                  <TableCell>
                    {medicos.find((medico) => medico.id === ficha.medicoId)?.nombre}
                  </TableCell>
                  <TableCell>{ficha.fecha}</TableCell>
                  <TableCell>{ficha.motivoConsulta}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(ficha)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(ficha.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default RegistroFichas;
