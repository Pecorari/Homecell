import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Clientes from './pages/Clientes';
import CadCli from './pages/CadCli';
import Perfil from './pages/Perfil';

function Routas() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Clientes} />
        <Route path="/cadastrar-cliente" Component={CadCli} />
        <Route path="/clientes/:id" Component={Perfil} />
      </Routes>
    </Router>
    );
}

export default Routas;
