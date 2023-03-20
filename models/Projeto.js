const mongoose = require('mongoose');
const Premio = require('./Premio');

const ProjetoSchema = new mongoose.Schema({
    premio: {
        required: true,
        type: Premio
    },
    autores: {
        required: true,
        type: [Autor]
    },
    titulo: {
        required: true,
        type: String
    },
    resumo: {
        required: true,
        type: String
    },
    dataEnvio: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Projeto', ProjetoSchema)