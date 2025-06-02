import React, { useEffect, useState } from 'react';
import { fetchProveedores, createProveedor, deleteProveedor } from '../api/api';

export function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [form, setForm] = useState({ dni: '', nombre: '', direccion: '', telefono: '', web: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarProveedores();
  }, []);

  async function cargarProveedores() {
    setLoading(true);
    try {
      const data = await fetchProveedores();
      setProveedores(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createProveedor(form);
      setForm({ dni: '', nombre: '', direccion: '', telefono: '', web: '' });
      cargarProveedores();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('¿Eliminar proveedor?')) return;
    try {
      await deleteProveedor(id);
      cargarProveedores();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Proveedores</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="DNI" value={form.dni} onChange={e => setForm({ ...form, dni: e.target.value })} required />
        <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
        <input placeholder="Dirección" value={form.direccion} onChange={e => setForm({ ...form, direccion: e.target.value })} />
        <input placeholder="Teléfono" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} />
        <input placeholder="Web" value={form.web} onChange={e => setForm({ ...form, web: e.target.value })} />
        <button type="submit">Agregar</button>
      </form>

      {loading && <p>Cargando proveedores...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {proveedores.map(p => (
          <li key={p.id}>
            {p.nombre} - {p.dni}
            <button onClick={() => handleDelete(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
