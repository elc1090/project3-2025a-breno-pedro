const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nome: String,
  login: { type: String, unique: true }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
