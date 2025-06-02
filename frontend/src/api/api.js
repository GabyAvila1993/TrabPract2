const API_URL = 'http://localhost:4000';

// Clientes
export async function fetchClientes() {
  const res = await fetch(`${API_URL}/clientes`);
  if (!res.ok) throw new Error('Error al obtener clientes');
  return await res.json();
}

export async function createCliente(cliente) {
  const res = await fetch(`${API_URL}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente)
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Error al crear cliente');
  }
  return await res.json();
}

export async function deleteCliente(id) {
  const res = await fetch(`${API_URL}/clientes/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Error al eliminar cliente');
  return await res.json();
}

// Proveedores
export async function fetchProveedores() {
  const res = await fetch(`${API_URL}/proveedores`);
  if (!res.ok) throw new Error('Error al obtener proveedores');
  return await res.json();
}

export async function createProveedor(proveedor) {
  const res = await fetch(`${API_URL}/proveedores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(proveedor)
  });
  if (!res.ok) throw new Error('Error al crear proveedor');
  return await res.json();
}

export async function deleteProveedor(id) {
  const res = await fetch(`${API_URL}/proveedores/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Error al eliminar proveedor');
  return await res.json();
}

// Productos
export async function fetchProductos() {
  const res = await fetch(`${API_URL}/productos`);
  if (!res.ok) throw new Error('Error al obtener productos');
  return await res.json();
}

export async function createProducto(producto) {
  const res = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  if (!res.ok) throw new Error('Error al crear producto');
  return await res.json();
}

export async function deleteProducto(id) {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Error al eliminar producto');
  return await res.json();
}

// Categorías
export async function fetchCategorias() {
  const res = await fetch(`${API_URL}/categorias`);
  if (!res.ok) throw new Error('Error al obtener categorías');
  return await res.json();
}

export async function createCategoria(categoria) {
  const res = await fetch(`${API_URL}/categorias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria)
  });
  if (!res.ok) throw new Error('Error al crear categoría');
  return await res.json();
}

export async function deleteCategoria(id) {
  const res = await fetch(`${API_URL}/categorias/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Error al eliminar categoría');
  return await res.json();
}

// Ventas
export async function fetchVentas() {
  const res = await fetch(`${API_URL}/ventas`);
  if (!res.ok) throw new Error('Error al obtener ventas');
  return await res.json();
}

export async function createVenta(venta) {
  const res = await fetch(`${API_URL}/ventas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(venta)
  });
  if (!res.ok) throw new Error('Error al crear venta');
  return await res.json();
}

export async function deleteVenta(id) {
  const res = await fetch(`${API_URL}/ventas/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Error al eliminar venta');
  return await res.json();
}
