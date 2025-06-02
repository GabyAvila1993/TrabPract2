import React, { useEffect, useState } from 'react';
import { fetchProductos, createProducto, deleteProducto } from '../api/api';

export function Productos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [proveedorId, setProveedorId] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  async function cargarProductos() {
    try {
      const data = await fetchProductos();
      setProductos(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleAgregarProducto(e) {
    e.preventDefault();
    try {
      await createProducto({ nombre, precio: parseFloat(precio), stock: parseInt(stock), categoriaId: parseInt(categoriaId), proveedorId: parseInt(proveedorId) });
      setNombre('');
      setPrecio('');
      setStock('');
      setCategoriaId('');
      setProveedorId('');
      cargarProductos();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleEliminarProducto(id) {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;
    try {
      await deleteProducto(id);
      cargarProductos();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Productos</h2>

      <form onSubmit={handleAgregarProducto}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
        <input type="number" placeholder="Categoría ID" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required />
        <input type="number" placeholder="Proveedor ID" value={proveedorId} onChange={(e) => setProveedorId(e.target.value)} required />
        <button type="submit">Agregar Producto</button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            {producto.nombre} - ${producto.precio} - Stock: {producto.stock}
            <button onClick={() => handleEliminarProducto(producto.id)} style={{ marginLeft: '1rem' }}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
