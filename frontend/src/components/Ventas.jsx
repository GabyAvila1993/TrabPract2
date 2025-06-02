import React, { useEffect, useState } from 'react';
import {
  fetchVentas,
  createVenta,
  deleteVenta,
  fetchClientes,
  fetchProductos,
} from '../api/api';

export function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [descuento, setDescuento] = useState(0);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      const [ventasData, clientesData, productosData] = await Promise.all([
        fetchVentas(),
        fetchClientes(),
        fetchProductos(),
      ]);
      setVentas(ventasData);
      setClientes(clientesData);
      setProductos(productosData);
    } catch (err) {
      setError(err.message);
    }
  }

  function agregarProducto(id) {
    const existente = productosSeleccionados.find((p) => p.productoId === id);
    if (existente) return;

    const producto = productos.find((p) => p.id === id);
    setProductosSeleccionados([
      ...productosSeleccionados,
      { productoId: id, cantidad: 1, precioVenta: producto.precio },
    ]);
  }

  function actualizarCantidad(index, cantidad) {
    const actualizados = [...productosSeleccionados];
    actualizados[index].cantidad = parseInt(cantidad);
    setProductosSeleccionados(actualizados);
  }

  async function handleCrearVenta(e) {
    e.preventDefault();

    const productosFinal = productosSeleccionados.map((p) => ({
      productoId: p.productoId,
      cantidad: p.cantidad,
      precioVenta: p.precioVenta,
      subtotal: p.cantidad * p.precioVenta,
    }));

    const montoFinal = productosFinal.reduce((sum, p) => sum + p.subtotal, 0) * (1 - descuento / 100);

    try {
      await createVenta({
        clienteId: parseInt(clienteId),
        descuento: parseFloat(descuento),
        productos: productosFinal,
      });

      setClienteId('');
      setDescuento(0);
      setProductosSeleccionados([]);
      cargarDatos();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleEliminarVenta(id) {
    if (!confirm('¿Eliminar esta venta?')) return;
    try {
      await deleteVenta(id);
      cargarDatos();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Ventas</h2>

      <form onSubmit={handleCrearVenta}>
        <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
          <option value="">Seleccionar cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre} - {c.dni}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Descuento (%)"
          value={descuento}
          onChange={(e) => setDescuento(e.target.value)}
          min="0"
          max="100"
        />

        <div>
          <h4>Productos</h4>
          <select onChange={(e) => agregarProducto(parseInt(e.target.value))}>
            <option value="">Agregar producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} - ${p.precio}
              </option>
            ))}
          </select>

          <ul>
            {productosSeleccionados.map((p, index) => {
              const info = productos.find((prod) => prod.id === p.productoId);
              return (
                <li key={p.productoId}>
                  {info.nombre} - ${info.precio} x
                  <input
                    type="number"
                    value={p.cantidad}
                    onChange={(e) => actualizarCantidad(index, e.target.value)}
                    min="1"
                    style={{ width: '60px', margin: '0 8px' }}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <button type="submit">Registrar Venta</button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul>
        {ventas.map((venta) => (
          <li key={venta.id}>
            {new Date(venta.fecha).toLocaleString()} - Cliente ID: {venta.clienteId} - Total: ${venta.montoFinal}
            <button onClick={() => handleEliminarVenta(venta.id)} style={{ marginLeft: '1rem' }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
