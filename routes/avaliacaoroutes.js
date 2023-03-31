const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Avaliacao = require("../models/Avaliacao");

module.exports = router;

router.post('/novo', async(req, res) => {
    const data = new Avaliacao({
        projeto: req.body.projeto,
        avaliador: req.body.avaliador,
        parecer: req.body.parecer,
        nota: req.body.nota,
        dataAvaliacao: req.body.dataAvaliacao
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
        var avaliacoes = "";
        const data = await Avaliacao.find();
        data.forEach(function(avaliacao) {
            avaliacoes+=`\n Avaliacao: (${avaliacao._id})`;
            avaliacoes+=`\n    Avaliador: ${avaliacao.avaliador}`;
            avaliacoes+=`\n    Projeto: ${avaliacao.projeto}`;
            avaliacoes+=`\n    Nota: ${avaliacao.nota}`;
            avaliacoes+=`\n    Parecer: ${avaliacao.parecer}`;
            avaliacoes+=`\n    Data da Avaliação: ${avaliacao.dataAvaliacao}`;
            avaliacoes+=`\n`;
        });
        res.send(avaliacoes);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/consultar/:id', async (req, res) => {
    try {
        var avaliacao = "";
        const id = req.params.id;
        const data = await Avaliacao.findById(id);
        avaliacao+=`\n Avaliacao: (${data._id})`;
        avaliacao+=`\n    Avaliador: ${data.avaliador}`;
        avaliacao+=`\n    Projeto: ${data.projeto}`;
        avaliacao+=`\n    Nota: ${data.nota}`;
        avaliacao+=`\n    Parecer: ${data.parecer}`;
        avaliacao+=`\n    Data da Avaliação: ${data.dataAvaliacao}`;
        avaliacao+=`\n`;
        res.send(avaliacao);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.patch('/atualizar/:id', async (req, res) => {

    try{
        const id = req.params.id;
        const data = await Avaliacao.findByIdAndUpdate(id, {
            avaliador: req.body.avaliador,
            projeto: req.body.projeto,
            parecer: req.body.parecer,
            nota: req.body.nota,
            dataAvaliacao: req.body.dataAvaliacao
        })
        res.send(`Avaliacao ${req.params.id} atualizada!`);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
});

router.delete('/remover/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Avaliacao.findByIdAndDelete(id);
        res.send(`Avaliacao ${data._id} foi removida!`);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});