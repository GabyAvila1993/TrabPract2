const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Registrar una nueva venta
router.post('/', async (req, res) => {
  try {
    const { clienteId, descuento = 0, productos } = req.body;

    let montoFinal = 0;
    const itemsVenta = [];

    // Validar stock y calcular subtotales
    for (const item of productos) {
      const producto = await prisma.producto.findUnique({
        where: { id: item.productoId }
      });

      if (!producto) throw new Error(`Producto con ID ${item.productoId} no encontrado`);
      if (producto.stock < item.cantidad)
        throw new Error(`Stock insuficiente para el producto "${producto.nombre}"`);

      const subtotal = producto.precio * item.cantidad;
      montoFinal += subtotal;

      itemsVenta.push({
        productoId: producto.id,
        precioVenta: producto.precio,
        cantidad: item.cantidad,
        subtotal
      });
    }

    const montoConDescuento = Math.round(montoFinal * (1 - descuento / 100));

    const venta = await prisma.venta.create({
      data: {
        fecha: new Date(),
        clienteId,
        descuento,
        montoFinal: montoConDescuento,
        productos: {
          create: itemsVenta
        }
      },
      include: {
        productos: true
      }
    });

    // Actualizar stock
    for (const item of productos) {
      await prisma.producto.update({
        where: { id: item.productoId },
        data: {
          stock: {
            decrement: item.cantidad
          }
        }
      });
    }

    res.status(201).json(venta);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Listar todas las ventas con detalles
router.get('/', async (req, res) => {
  try {
    const ventas = await prisma.venta.findMany({
      include: {
        cliente: true,
        productos: {
          include: {
            producto: true
          }
        }
      }
    });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar una venta y sus productos
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.ventaProducto.deleteMany({ where: { ventaId: id } });
    await prisma.venta.delete({ where: { id } });

    res.json({ message: `Venta ${id} eliminada` });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
