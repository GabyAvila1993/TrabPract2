require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API Sistema de Ventas funcionando');
});

// Rutas importadas
const clientesRoutes = require('./routes/clientes');
const proveedoresRoutes = require('./routes/proveedores');
const productosRoutes = require('./routes/productos');
const ventasRoutes = require('./routes/ventas');
const categoriasRoutes = require('./routes/categorias');

// Uso de las rutas
app.use('/clientes', clientesRoutes);
app.use('/proveedores', proveedoresRoutes);
app.use('/productos', productosRoutes);
app.use('/ventas', ventasRoutes);
app.use('/categorias', categoriasRoutes);

// Inicialización del servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});

