const express = require('express');
const router = express.Router();
const Etapa = require("../models/Etapa");
const Premio = require("../models/Premio");

module.exports = router;

router.post('/nova', async(req, res) => {
    const data = new Etapa({
        nome: req.body.nome,
        premio: req.body.premio,
        descricao: req.body.descricao,
        dataInicio: req.body.dataInicio,
        dataFim: req.body.dataFim
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
        var etapas = "";
        const data = await Etapa.find();
        data.forEach(function(etapa) {
            etapas+=`\n Etapa: ${etapa.nome} (${etapa._id})`;
            etapas+=`\n    Premio: ${etapa.premio}`;
            etapas+=`\n    Descrição: ${etapa.descricao}`;
            etapas+=`\n    Data: de ${etapa.dataInicio} à ${etapa.dataFim}`;
            etapas+=`\n`;
        });
        res.send(etapas);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/consultar/:id', async (req, res) => {
    try {
        var etapa = "";
        const id = req.params.id;
        const data = await Etapa.findById(id);
        etapa+=`\n Etapa: ${data.nome} (${data._id})`;
        etapa+=`\n    Premio: ${data.premio}`;
        etapa+=`\n    Descrição: ${data.descricao}`;
        etapa+=`\n    Data: de ${data.dataInicio} à ${data.dataFim}`;
        res.send(etapa);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.patch('/atualizar/:id', async (req, res) => {

    try{
        const id = req.params.id;
        const data = await Etapa.findByIdAndUpdate(id, {
            nome: req.body.nome,
            premio: req.body.premio,
            descricao: req.body.descricao,
            dataInicio: req.body.dataInicio,
            dataFim: req.body.dataFim
        })
        res.send(`Etapa ${req.body.nome} atualizada!`);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
});

router.delete('/remover/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Etapa.findByIdAndDelete(id);
        res.send(`Etapa ${data.nome} foi removida!`);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});