import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles.css';


import { Clientes } from './components/Clientes';
import { Proveedores } from './components/Proveedores';
import { Productos } from './components/Productos';
import { Categorias } from './components/Categorias';
import { Ventas } from './components/Ventas';

function App() {
  return (
    <Router>
      <div>
        <h1>Sistema de Ventas</h1>

        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/" style={{ marginRight: '1rem' }}>Clientes</Link>
          <Link to="/proveedores" style={{ marginRight: '1rem' }}>Proveedores</Link>
          <Link to="/productos" style={{ marginRight: '1rem' }}>Productos</Link>
          <Link to="/categorias" style={{ marginRight: '1rem' }}>Categorías</Link>
          <Link to="/ventas">Ventas</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Clientes />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ventas" element={<Ventas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
