import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Clientes from './pages/Clientes';
import CadCli from './pages/CadCli';
import Perfil from './pages/Perfil';
import Login from './pages/Login';
import Home from './pages/Home';

function Routas() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/clientes" Component={Clientes} />
        <Route path="/cadastrar-cliente" Component={CadCli} />
        <Route path="/clientes/:id" Component={Perfil} />
      </Routes>
    </Router>
    );
}

export default Routas;
