const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear una nueva categoría
router.post('/', async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const categoria = await prisma.categoria.create({
      data: { nombre, descripcion }
    });
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todas las categorías
router.get('/', async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar una categoría (y los productos que dependen de ella)
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    // Eliminar productos relacionados primero
    await prisma.producto.deleteMany({ where: { categoriaId: id } });

    await prisma.categoria.delete({ where: { id } });
    res.json({ message: `Categoría ${id} eliminada` });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
