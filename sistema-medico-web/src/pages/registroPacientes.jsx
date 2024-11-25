import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const RegistroPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
  });
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false); 
  const [editId, setEditId] = useState(null); 

  // Obtener pacientes
  const fetchPacientes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/pacientes");
      setPacientes(response.data);
    } catch (error) {
      console.error("Error al obtener pacientes:", error);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Registrar o actualizar pacientes
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        const response = await axios.patch(
          `http://localhost:3000/pacientes/${editId}`,
          formData
        );
        alert(`Paciente actualizado: ${response.data.nombre} ${response.data.apellido}`);
      } else {
        const response = await axios.post(
          "http://localhost:3000/pacientes",
          formData
        );
        alert(`Paciente registrado: ${response.data.nombre} ${response.data.apellido}`);
      }

      // Limpiar formulario y recargar pacientes
      setFormData({
        nombre: "",
        apellido: "",
        cedula: "",
        email: "",
        telefono: "",
        fechaNacimiento: "",
      });
      setIsEditing(false);
      setEditId(null);
      fetchPacientes();
    } catch (error) {
      console.error(
        "Error al guardar paciente:",
        error.response?.data || error.message
      );
      alert(
        `No se pudo guardar el paciente. Motivo: ${
          error.response?.data ||
          "Error desconocido, revisa la consola para más detalles."
        }`
      );
    }
  };

  const handleEdit = (paciente) => {
    setFormData(paciente);
    setIsEditing(true);
    setEditId(paciente.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/pacientes/${id}`);
      fetchPacientes();
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Registro de Pacientes
      </Typography>
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">
          {isEditing ? "Editar Paciente" : "Registrar Paciente"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <TextField
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Cédula"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Correo Electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Teléfono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Fecha de Nacimiento"
              name="fechaNacimiento"
              type="date"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            {isEditing ? "Actualizar Paciente" : "Registrar Paciente"}
          </Button>
        </form>
      </Paper>

      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6">Listado de Pacientes</Typography>
        <TextField
          label="Buscar por nombre o cédula"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Cédula</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Fecha de Nacimiento</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pacientes
              .filter(
                (p) =>
                  p.nombre.toLowerCase().includes(search.toLowerCase()) ||
                  p.cedula.includes(search)
              )
              .map((paciente) => (
                <TableRow key={paciente.id}>
                  <TableCell>{paciente.nombre}</TableCell>
                  <TableCell>{paciente.apellido}</TableCell>
                  <TableCell>{paciente.cedula}</TableCell>
                  <TableCell>{paciente.email}</TableCell>
                  <TableCell>{paciente.telefono}</TableCell>
                  <TableCell>{paciente.fechaNacimiento}</TableCell> 
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(paciente)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(paciente.id)}
                      >
                        Eliminar
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default RegistroPacientes;
