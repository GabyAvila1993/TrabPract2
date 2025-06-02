const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los proveedores
router.get('/', async (req, res) => {
  try {
    const proveedores = await prisma.proveedor.findMany();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proveedores' });
  }
});

// Crear un proveedor
router.post('/', async (req, res) => {
  const { dni, nombre, direccion, telefono, web } = req.body;
  try {
    const proveedor = await prisma.proveedor.create({
      data: { dni, nombre, direccion, telefono, web }
    });
    res.status(201).json(proveedor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un proveedor (y sus productos relacionados)
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    // Primero eliminamos los productos asociados al proveedor
    await prisma.producto.deleteMany({ where: { proveedorId: id } });

    // Luego eliminamos el proveedor
    await prisma.proveedor.delete({ where: { id } });

    res.json({ message: `Proveedor ${id} eliminado correctamente.` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
