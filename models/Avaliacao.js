const mongoose = require('mongoose');

const AvaliacaoSchema = new mongoose.Schema({
    projeto: {
        required: true,
        type: mongoose.Schema.ObjectId,
        ref: "Projeto"
    },
    avaliador: {
        required: true,
        type: mongoose.Schema.ObjectId,
        ref: "Avaliador"
    },
    parecer: {
        required: true,
        type: String
    },
    nota: {
        required: true,
        type: Number
    },
    dataAvaliacao: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Avaliacao', AvaliacaoSchema)