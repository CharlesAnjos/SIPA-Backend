const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const Projeto = require("../models/Projeto");
const Premio = require("../models/Premio");
const mongoose = require('mongoose');

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
        const data = await Projeto.find();
        res.send(data);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/listar/:projetoid', async (req, res) => {
    try {
        const projetoid = req.params.projetoid;
        const data = await getProjetosFromPremio(projetoid);
        res.send(data);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/consultar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Projeto.findById(id);
        res.send(data);
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

async function getProjetosFromPremio(premio_id){
    var projetos = null;
    try {
        projetos = await Projeto.aggregate([
            {
                $match: { "premio": mongoose.Types.ObjectId(premio_id)},
            },
            {
                $lookup: {
                    from: Premio.collection.name,
                    localField: 'premio',
                    foreignField: '_id',
                    as: 'premio'
                },
            },
            {
                $unwind: "$premio"
            }
        ]);
    }
    catch (error) {
        console.log(error);
    }
    return projetos;
};