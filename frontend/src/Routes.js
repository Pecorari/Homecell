import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Clientes from './pages/Clientes';
import CadCli from './pages/CadCli';
import CadCell from './pages/CadCell';
import Perfil from './pages/Perfil';

function Routas() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Clientes} />
        <Route path="/cadastrar-cliente" Component={CadCli} />
        <Route path="/cadastrar-aparelho" Component={CadCell} />
        <Route path="/perfil" Component={Perfil} />
      </Routes>
    </Router>
    );
}

export default Routas;
