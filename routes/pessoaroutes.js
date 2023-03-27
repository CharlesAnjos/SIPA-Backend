const express = require('express');
const router = express.Router();
const Pessoa = require("../models/Pessoa");

module.exports = router;

router.post('/nova', async(req, res) => {
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
        data.forEach(function(pessoa) {
            pessoas+=`\n Pessoa: ${pessoa.nome} (${pessoa._id})`;
            pessoas+=`\n     CPF: ${pessoa.cpf}`;
            pessoas+=`\n     Email: ${pessoa.email}`;
            pessoas+=`\n`;
        });
        res.send(pessoas);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/consultar/:id', async (req, res) => {
    try {
        var pessoa = "";
        const id = req.params.id;
        const data = await Pessoa.findById(id);
        pessoa+=`\n Pessoa: ${data.nome} (${data._id})`;
        pessoa+=`\n    CPF: ${data.cpf}`;
        pessoa+=`\n    Email: ${data.email}`;
        res.send(pessoa);
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