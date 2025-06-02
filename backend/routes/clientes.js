const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany({ include: { telefonos: true } });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

// Crear cliente
router.post('/', async (req, res) => {
  const { dni, nombre, calle, numero, localidad, telefonos } = req.body;
  try {
    const nuevoCliente = await prisma.cliente.create({
      data: {
        dni, nombre, calle, numero, localidad,
        telefonos: {
          create: telefonos.map(numero => ({ numero }))
        }
      },
      include: { telefonos: true }
    });
    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear cliente' });
  }
});

// Eliminar cliente
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const ventas = await prisma.venta.findMany({ where: { clienteId: id }, select: { id: true } });
    const ventaIds = ventas.map(v => v.id);
    await prisma.ventaProducto.deleteMany({ where: { ventaId: { in: ventaIds } } });
    await prisma.venta.deleteMany({ where: { clienteId: id } });
    await prisma.telefono.deleteMany({ where: { clienteId: id } });
    await prisma.cliente.delete({ where: { id } });
    res.json({ message: `Cliente ${id} y datos relacionados eliminados.` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
