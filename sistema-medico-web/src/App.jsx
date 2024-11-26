import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistroPacientes from "./pages/registroPacientes";
import RegistroMedicos from "./pages/RegistroMedico";
import HistorialClinico from "./pages/HistorialClinico";
import NavBar from "./components/NavBar";
import Inicio from "./pages/Inicio"; 

function App() {
  return (
    <Router>
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro-pacientes" element={<RegistroPacientes />} />
          <Route path="/registro-medico" element={<RegistroMedicos />} />
          <Route path="/historial-clinico" element={<HistorialClinico />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
