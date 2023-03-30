const express = require('express');
const router = express.Router();
const Avaliador = require("../models/Avaliador");

module.exports = router;

router.post('/novo', async(req, res) => {
    const data = new Avaliador({
        pessoa: req.body.pessoa,
        registro: req.body.registro,
        area: req.body.area
    });

    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
});

router.get('/listar', async (req, res) => {
    try {
        var avaliadores = "";
        const data = await Avaliador.find();
        data.forEach(function(avaliador) {
            avaliadores+=`\n Avaliador: ${avaliador.pessoa} (${avaliador._id})`;
            avaliadores+=`\n     Registro: ${avaliador.registro}`;
            avaliadores+=`\n     Área: ${avaliador.area}`;
            avaliadores+=`\n`;
        });
        res.send(avaliadores);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/consultar/:id', async (req, res) => {
    try {
        var avaliador = "";
        const id = req.params.id;
        const data = await Avaliador.findById(id);
        avaliador+=`\n Avaliador: ${data.pessoa} (${data._id})`;
        avaliador+=`\n    Registro: ${data.registro}`;
        avaliador+=`\n    Área: ${data.area}`;
        res.send(avaliador);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.patch('/atualizar/:id', async (req, res) => {

    try{
        const id = req.params.id;
        const data = await Avaliador.findByIdAndUpdate(id, {
            pessoa: req.body.pessoa,
            registro: req.body.registro,
            area: req.body.area
        })
        res.send(`Avaliador ${req.body.pessoa} atualizado!`);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
});

router.delete('/remover/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Avaliador.findByIdAndDelete(id);
        res.send(`Avaliador ${data.pessoa} foi removido!`);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});