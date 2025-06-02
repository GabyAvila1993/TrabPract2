const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los productos (incluye proveedor y categoría)
router.get('/', async (req, res) => {
  try {
    const productos = await prisma.producto.findMany({
      include: {
        proveedor: true,
        categoria: true,
      },
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Crear un producto
router.post('/', async (req, res) => {
  try {
    const { nombre, precio, stock, categoriaId, proveedorId } = req.body;
    const producto = await prisma.producto.create({
      data: { nombre, precio, stock, categoriaId, proveedorId },
    });
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Modificar stock (incrementar o decrementar)
router.patch('/:id/stock', async (req, res) => {
  const productoId = parseInt(req.params.id);
  const { cantidad } = req.body;

  if (typeof cantidad !== 'number') {
    return res.status(400).json({ error: 'La cantidad debe ser un número' });
  }

  try {
    const productoActualizado = await prisma.producto.update({
      where: { id: productoId },
      data: {
        stock: {
          increment: cantidad,
        },
      },
    });

    res.json(productoActualizado);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al actualizar el stock' });
  }
});

module.exports = router;
