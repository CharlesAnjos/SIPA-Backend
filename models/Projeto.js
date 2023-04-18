const mongoose = require('mongoose');

const ProjetoSchema = new mongoose.Schema({
    premio: {
        required: true,
        type: mongoose.Schema.ObjectId,
        ref: "Premio"
    },
    autores: [{
        required: true,
        type: mongoose.Schema.ObjectId,
        ref: "Autor"
    }],
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
},{collection:'projetos'})

module.exports = mongoose.model('Projeto', ProjetoSchema)