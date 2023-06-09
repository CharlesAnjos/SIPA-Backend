const express = require('express');
const router = express.Router();
const Autor = require("../models/Autor");
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
        const data = new Autor({
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
        const data = await getAutoresPessoas();
        res.send(data);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.get('/consultar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await getAutorPessoa(id);
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
            const autorData = await Autor.findByIdAndUpdate(aid, {
                pessoa: pessoaData,
                registro: req.body.registro,
                area: req.body.area
            });
            res.send(autorData);
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
        const autorData = await Autor.findByIdAndDelete(id);
        const pessoaData = await Pessoa.findByIdAndDelete(autorData.pessoa._id);
        res.send(`autor removido:\n${autorData}`);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

async function getProjetosAutores(){
    var projetos = null;
    try {
        projetos = await Projeto.aggregate([
            {
                $lookup: {
                    from: Premio.collection.name,
                    localField: 'premio',
                    foreignField: '_id',
                    as: 'premio'
                }
            },
            {
                $unwind: "$premio"
            },{
                $lookup: {
                    from: Autor.collection.name,
                    localField: 'autores',
                    foreignField: '_id',
                    as: 'autores'
                }
            },
            {
                $unwind: "$autores"
            },
            {
                $lookup: {
                    from: Pessoa.collection.name,
                    localField: 'autores.pessoa',
                    foreignField: '_id',
                    as: 'autores.pessoa'
                },
            },
            {
                $unwind: "$autores.pessoa"
            },
        ]);
    }
    catch (error) {
        console.log(error);
    }
    return projetos;
};

async function getAutoresPessoas(){
    var autores = null;
    try {
        autores = await Autor.aggregate([
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
    return autores;
};

async function getAutorPessoa(id){
    var autor = null;
    try {
        autor = await Autor.aggregate([
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
    return autor;
};