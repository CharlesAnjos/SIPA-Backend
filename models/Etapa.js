const mongoose = require('mongoose');
const Premio = require('./Premio');

const EtapaSchema = new mongoose.Schema({
    nome: {
        required: true,
        type: String
    },
    premio: {
        required: true,
        type: Premio
    },
    dataInicio: {
        required: true,
        type: String
    },
    dataFim: {
        required: true,
        type: String
    },
    descricao: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Etapa', EtapaSchema)