import React, { useEffect, useState } from 'react';
import { fetchCategorias, createCategoria, deleteCategoria } from '../api/api';

export function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarCategorias();
  }, []);

  async function cargarCategorias() {
    try {
      const data = await fetchCategorias();
      setCategorias(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleAgregarCategoria(e) {
    e.preventDefault();
    try {
      await createCategoria({ nombre, descripcion });
      setNombre('');
      setDescripcion('');
      cargarCategorias();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleEliminarCategoria(id) {
    if (!confirm('¿Seguro que deseas eliminar esta categoría?')) return;
    try {
      await deleteCategoria(id);
      cargarCategorias();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Categorías</h2>

      <form onSubmit={handleAgregarCategoria}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        <button type="submit">Agregar Categoría</button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul>
        {categorias.map(categoria => (
          <li key={categoria.id}>
            {categoria.nombre} - {categoria.descripcion}
            <button onClick={() => handleEliminarCategoria(categoria.id)} style={{ marginLeft: '1rem' }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
