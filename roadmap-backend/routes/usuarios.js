const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// Login fake: apenas verifica se login existe
router.post('/login', async (req, res) => {
  const { login } = req.body;
  const usuario = await Usuario.findOne({ login });

  if (!usuario) {
    return res.status(401).json({ erro: 'Usuário não encontrado' });
  }

  res.json(usuario);
});

// Criar usuário
router.post('/', async (req, res) => {
  const { nome, login } = req.body;

  try {
    const novoUsuario = new Usuario({ nome, login });
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao criar usuário' });
  }
});

module.exports = router;
