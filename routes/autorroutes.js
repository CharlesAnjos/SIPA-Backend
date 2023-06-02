const express = require('express');
const router = express.Router();
const Autor = require("../models/Autor");
const Pessoa = require("../models/Pessoa");

module.exports = router;

router.post('/novo', async(req, res) => {
    const data = new Autor({
        pessoa: req.body.pessoa,
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
        var autor = "";
        const id = req.params.id;
        const data = await Autor.findById(id);
        autor+=`\n Autor: ${data.pessoa} (${data._id})`;
        autor+=`\n    Registro: ${data.registro}`;
        autor+=`\n    Área: ${data.area}`;
        res.send(autor);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.patch('/atualizar/:id', async (req, res) => {

    try{
        const id = req.params.id;
        const data = await Autor.findByIdAndUpdate(id, {
            pessoa: req.body.pessoa,
            registro: req.body.registro,
            area: req.body.area
        })
        res.send(`Autor ${req.body.pessoa} atualizado!`);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
});

router.delete('/remover/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Autor.findByIdAndDelete(id);
        res.send(`Autor ${data.pessoa} foi removido!`);
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