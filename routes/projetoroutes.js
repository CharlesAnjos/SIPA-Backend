const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Projeto = require("../models/Projeto");

module.exports = router;

router.post('/novo', async(req, res) => {
    const data = new Projeto({
        premio: req.body.premio,
        autores: req.body.autores,
        titulo: req.body.titulo,
        resumo: req.body.resumo,
        dataEnvio: req.body.dataEnvio
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
        var projetos = "";
        const data = await Projeto.find();
        data.forEach(function(projeto) {
            projetos+=`\n Projeto: ${projeto.titulo} (${projeto._id})`;
            projetos+=`\n    Autores: ${projeto.autores}`;
            projetos+=`\n    Premio: ${projeto.premio}`;
            projetos+=`\n    Resumo: ${projeto.resumo}`;
            projetos+=`\n    Data do Envio: ${projeto.dataEnvio}`;
            projetos+=`\n`;
        });
        res.send(projetos);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/consultar/:id', async (req, res) => {
    try {
        var projeto = "";
        const id = req.params.id;
        const data = await Projeto.findById(id);
        projeto+=`\n Projeto: ${data.titulo} (${data._id})`;
        projeto+=`\n    Autores: ${data.autores}`;
        projeto+=`\n    Premio: ${data.premio}`;
        projeto+=`\n    Resumo: ${data.resumo}`;
        projeto+=`\n    Data do Envio: ${data.dataEnvio}`;
        projeto+=`\n`;
        res.send(projeto);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.patch('/atualizar/:id', async (req, res) => {

    try{
        const id = req.params.id;
        const data = await Projeto.findByIdAndUpdate(id, {
            autores: req.body.autores,
            premio: req.body.premio,
            titulo: req.body.titulo,
            resumo: req.body.resumo,
            dataEnvio: req.body.dataEnvio
        })
        res.send(`Projeto ${req.body.titulo} atualizado!`);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
});

router.delete('/remover/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Projeto.findByIdAndDelete(id);
        res.send(`Projeto ${data.titulo} foi removido!`);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});