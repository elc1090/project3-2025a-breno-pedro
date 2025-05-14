const express = require('express');
const router = express.Router();
const Roadmap = require('../models/Roadmap');

// Criar roadmap
router.post('/', async (req, res) => {
  const { titulo, conteudo, autor } = req.body;

  try {
    const novoRoadmap = new Roadmap({ titulo, conteudo, autor });
    await novoRoadmap.save();
    res.status(201).json(novoRoadmap);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao criar roadmap' });
  }
});

// Listar todos os roadmaps
router.get('/', async (req, res) => {
  const roadmaps = await Roadmap.find().populate('autor', 'nome login');
  res.json(roadmaps);
});

// Atualizar roadmap
router.put('/:id', async (req, res) => {
  try {
    const atualizado = await Roadmap.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(atualizado);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar roadmap' });
  }
});

// Deletar roadmap
router.delete('/:id', async (req, res) => {
  try {
    await Roadmap.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Roadmap removido' });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao deletar roadmap' });
  }
});

module.exports = router;
