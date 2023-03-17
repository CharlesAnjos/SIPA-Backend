const mongoose = require('mongoose');

const PessoaSchema = new mongoose.Schema({
    nome: {
        required: true,
        type: String
    },
    cpf: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Pessoa', PessoaSchema)