const express = require('express');
const router = express.Router();
const Premio = require("../models/Premio");

module.exports = router;

//Post Method
router.post('/premio/novo', async(req, res) => {
    const data = new Premio({
        nome: req.body.nome,
        descricao: req.body.descricao,
        descricao: req.body.ano,
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

//Get all Method
router.get('/premios/listar', async (req, res) => {
    try {
        var premios = "";
        const data = await Premio.find();
        data.forEach(function(premio) {
            premios+=`\n Evento: ${premio.nome} - ${premio.ano} (${premio._id})`;
            premios+=`\n    Descrição: ${premio.descricao}`;
            premios+=`\n    Data: de ${premio.dataInicio} à ${premio.dataFim}`;
        });
        res.send(premios);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

//Get by ID Method
router.get('/premio/:id', async (req, res) => {
    try {
        var premio = "";
        const id = req.params.id;
        const data = await Premio.findById(id);
        premio+=`\n Evento: ${data._id} , Nome: ${data.nome} - ${data.ano}`;
        premio+=`\n    Descrição: ${data.descricao}`;
        premio+=`\n    Data: de ${data.dataInicio} à ${data.dataFim}`;
        res.send(premio);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

//Update by ID Method
router.patch('/premio/atualizar/:id', async (req, res) => {

    try{
        const id = req.params.id;
        const data = await Premio.findByIdAndUpdate(id, {
            nome: req.body.nome,
            descricao: req.body.descricao,
            descricao: req.body.ano,
            dataInicio: req.body.dataInicio,
            dataFim: req.body.dataFim
        })
        res.send(`Evento ${data.nome} - ${data.ano} atualizado!`);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
});

//Delete by ID Method
router.delete('/premio/deletar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Premio.findByIdAndDelete(id);
        res.send(`Prêmio ${data.nome} - ${data.ano} has been deleted`);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});