import React, { useState, useEffect } from 'react';
import { fetchClientes, createCliente, deleteCliente } from '../api/api';

export function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [telefono, setTelefono] = useState('');

  useEffect(() => {
    cargarClientes();
  }, []);

  async function cargarClientes() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchClientes();
      setClientes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAgregarCliente(e) {
    e.preventDefault();
    setError(null);

    if (!nombre || !dni || !calle || !numero || !localidad) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      // Enviar telefonos como array (aunque sea 1 teléfono)
      await createCliente({
        nombre,
        dni,
        calle,
        numero,
        localidad,
        telefonos: telefono ? [telefono] : []
      });
      setNombre('');
      setDni('');
      setCalle('');
      setNumero('');
      setLocalidad('');
      setTelefono('');
      cargarClientes();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleEliminarCliente(id) {
    setError(null);
    if (!window.confirm('¿Estás seguro de eliminar este cliente?')) return;

    try {
      await deleteCliente(id);
      cargarClientes();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Clientes</h2>

      <form onSubmit={handleAgregarCliente} style={{ marginBottom: '1rem' }}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <input type="text" placeholder="DNI" value={dni} onChange={e => setDni(e.target.value)} required />
        <input type="text" placeholder="Calle" value={calle} onChange={e => setCalle(e.target.value)} required />
        <input type="text" placeholder="Número" value={numero} onChange={e => setNumero(e.target.value)} required />
        <input type="text" placeholder="Localidad" value={localidad} onChange={e => setLocalidad(e.target.value)} required />
        <input type="text" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} />
        <button type="submit" disabled={loading}>
          {loading ? 'Procesando...' : 'Agregar Cliente'}
        </button>
      </form>

      {loading && <p>Cargando clientes...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul>
        {clientes.map(c => (
          <li key={c.id}>
            {c.nombre} - {c.dni} - {c.calle} {c.numero} - {c.localidad} - Tel: {c.telefonos.map(t => t.numero).join(', ')}
            <button onClick={() => handleEliminarCliente(c.id)} style={{ marginLeft: '1rem' }} disabled={loading}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
