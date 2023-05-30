const express = require('express');
const router = express.Router();
const Premio = require("../models/Premio");

module.exports = router;

router.post('/novo', async(req, res) => {
    const data = new Premio({
        nome: req.body.nome,
        descricao: req.body.descricao,
        ano: req.body.ano,
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
        const data = await Premio.find();
        // data.forEach(function(premio) {
        //     premios+=`\n Evento: ${premio.nome} - ${premio.ano} (${premio._id})`;
        //     premios+=`\n    Descrição: ${premio.descricao}`;
        //     premios+=`\n    Data: de ${premio.dataInicio} à ${premio.dataFim}`;
        // });
        res.send(data);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/consultar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Premio.findById(id);
        res.send(data);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.patch('/atualizar/:id', async (req, res) => {

    try{
        const id = req.params.id;
        const data = await Premio.findByIdAndUpdate(id, {
            nome: req.body.nome,
            descricao: req.body.descricao,
            ano: req.body.ano,
            dataInicio: req.body.dataInicio,
            dataFim: req.body.dataFim
        })
        res.send(`Evento ${req.body.nome} - ${req.body.ano} atualizado!`);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
});

router.delete('/remover/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Premio.findByIdAndDelete(id);
        res.send(`Prêmio ${data.nome} - ${data.ano} foi removido!`);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});