const mongoose = require('mongoose');

const PessoaSchema = new mongoose.Schema({
    nome: {
        required: true,
        type: String
    },
    cpf: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    }
},{collection:'pessoas'})

module.exports = mongoose.model('Pessoa', PessoaSchema)