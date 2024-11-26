import { Typography, Container } from "@mui/material";

const Inicio = () => {
  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Bienvenido al Sistema Médico
      </Typography>
      <Typography variant="h5" align="center">
        Gestiona pacientes, médicos e historiales clínicos de manera eficiente.
      </Typography>
    </Container>
  );
};

export default Inicio;
