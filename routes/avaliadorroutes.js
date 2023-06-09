const express = require('express');
const router = express.Router();
const Avaliador = require("../models/Avaliador");
const Pessoa = require("../models/Pessoa");
const mongoose = require('mongoose');

module.exports = router;

router.post('/novo', async(req, res) => {
    const pessoa = new Pessoa({
        nome: req.body.pessoa.nome,
        cpf: req.body.pessoa.cpf,
        email: req.body.pessoa.email
    });
    try{
        const pessoaToSave = await pessoa.save();
        const data = new Avaliador({
            pessoa: pessoaToSave,
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
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
});

router.get('/listar', async (req, res) => {
    try {
        const data = await getAvaliadoresPessoas();
        res.send(data);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/consultar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await getAvaliadorPessoa(id);
        res.send(data);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.patch('/atualizar/:id', async (req, res) => {
    try{
        const aid = req.params.id;
        const pid = req.body.pessoa.id;
        const pessoaData = await Pessoa.findByIdAndUpdate(pid, {
            nome: req.body.pessoa.nome,
            cpf: req.body.pessoa.cpf,
            email: req.body.pessoa.email
        });
        try{
            const avaliadorData = await Avaliador.findByIdAndUpdate(aid, {
                pessoa: pessoaData,
                registro: req.body.registro,
                area: req.body.area
            });
            res.send(avaliadorData);
        }
        catch(error){
            res.status(400).json({message: error.message});
        }
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

router.delete('/remover/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const avaliadorData = await Avaliador.findByIdAndDelete(id);
        const pessoaData = await Pessoa.findByIdAndDelete(avaliadorData.pessoa._id);
        res.send(`avaliador removido:\n${avaliadorData}`);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

async function getAvaliadoresPessoas(){
    var avaliadores = null;
    try {
        avaliadores = await Avaliador.aggregate([
            {
                $lookup: {
                    from: Pessoa.collection.name,
                    localField: 'pessoa',
                    foreignField: '_id',
                    as: 'pessoa'
                },
            },
            {
                $unwind: "$pessoa"
            }
        ]);
    }
    catch (error) {
        console.log(error);
    }
    return avaliadores;
};

async function getAvaliadorPessoa(id){
    var avaliador = null;
    try {
        avaliador = await Avaliador.aggregate([
            {
                $match: { "_id": mongoose.Types.ObjectId(id)},
            },
            {
                $lookup: {
                    from: Pessoa.collection.name,
                    localField: 'pessoa',
                    foreignField: '_id',
                    as: 'pessoa'
                },
            },
            {
                $unwind: "$pessoa"
            }
        ]);
    }
    catch (error) {
        console.log(error);
    }
    return avaliador;
};