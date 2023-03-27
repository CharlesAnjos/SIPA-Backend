const express = require('express');
const router = express.Router();
const Autor = require("../models/Autor");

module.exports = router;

router.post('/nova', async(req, res) => {
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
        var autores = "";
        const data = await Autor.find();
        data.forEach(function(autor) {
            autores+=`\n Autor: ${autor.pessoa} (${autor._id})`;
            autores+=`\n     CPF: ${autor.registro}`;
            autores+=`\n     Email: ${autor.area}`;
            autores+=`\n`;
        });
        res.send(autores);
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
        autor+=`\n    CPF: ${data.registro}`;
        autor+=`\n    Email: ${data.area}`;
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
        res.send(`Autor ${req.body.pessoa} atualizada!`);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
});

router.delete('/remover/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Autor.findByIdAndDelete(id);
        res.send(`Autor ${data.pessoa} foi removida!`);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});