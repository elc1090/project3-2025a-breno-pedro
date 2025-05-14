const mongoose = require('mongoose');

const RoadmapSchema = new mongoose.Schema({
  titulo: String,
  conteudo: String, // markdown
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Roadmap', RoadmapSchema);
