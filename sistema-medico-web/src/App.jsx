import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistroPacientes from "./pages/registroPacientes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistroPacientes />} />
      </Routes>
    </Router>
  );
}

export default App;
