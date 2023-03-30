const mongoose = require('mongoose');

const AutorSchema = new mongoose.Schema({
    pessoa: {
        required: true,
        type: mongoose.Schema.ObjectId,
        ref: "Pessoa"
    },
    registro: {
        required: true,
        type: String
    },
    area: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Autor', AutorSchema)