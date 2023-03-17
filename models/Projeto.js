const mongoose = require('mongoose');
const Premio = require('./Premio');

const ProjetoSchema = new mongoose.Schema({
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
    },
    area: {
        required: true,
        type: String
    },
    premio: {
        required: true,
        type: Premio
    },
    autores: {
        required: true,
        type: [Autor]
    },
})

module.exports = mongoose.model('Projeto', ProjetoSchema)