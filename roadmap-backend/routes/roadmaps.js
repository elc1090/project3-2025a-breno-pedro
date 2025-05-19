const express = require('express');
const router = express.Router();
const Roadmap = require('../models/Roadmap');

// Criar roadmap
router.post('/', async (req, res) => {
  try {
    const roadmap = new Roadmap(req.body);
    await roadmap.save();
    res.status(201).json(roadmap);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todos os roadmaps
router.get('/', async (req, res) => {
  try {
    const roadmaps = await Roadmap.find();
    res.json(roadmaps);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar roadmaps.' });
  }
});

// Buscar roadmap por ID
router.get('/:id', async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    if (!roadmap) return res.status(404).json({ error: 'Roadmap não encontrado.' });
    res.json(roadmap);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar roadmap.' });
  }
});

// Atualizar roadmap
router.put('/:id', async (req, res) => {
  try {
    const roadmap = await Roadmap.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!roadmap) return res.status(404).json({ error: 'Roadmap não encontrado.' });
    res.json(roadmap);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar roadmap.' });
  }
});

// Deleta roadmap
router.delete('/:id', async (req, res) => {
  try {
    const roadmap = await Roadmap.findByIdAndDelete(req.params.id);
    if (!roadmap) return res.status(404).json({ error: 'Roadmap não encontrado.' });
    res.json({ mensagem: 'Roadmap removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar roadmap.' });
  }
});

module.exports = router;
