const express = require('express');
const router = express.Router();
const Pessoa = require("../models/Pessoa");

module.exports = router;

router.post('/novo', async(req, res) => {
    const data = new Pessoa({
        nome: req.body.nome,
        cpf: req.body.cpf,
        email: req.body.email
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
        var pessoas = "";
        const data = await Pessoa.find();
        res.send(data);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/consultar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Pessoa.findById(id);
        res.send(data);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.patch('/atualizar/:id', async (req, res) => {

    try{
        const id = req.params.id;
        const data = await Pessoa.findByIdAndUpdate(id, {
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email
        })
        res.send(`Pessoa ${req.body.nome} atualizada!`);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
});

router.delete('/remover/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Pessoa.findByIdAndDelete(id);
        res.send(`Pessoa ${data.nome} foi removida!`);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});