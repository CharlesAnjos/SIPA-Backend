const express = require('express');
const router = express.Router();
const Model = require("../models/Avaliador");

module.exports = router;

//Post Method
router.post('/post', async(req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
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
router.get('/getAll', async (req, res) => {
    try {
        var users = "";
        const data = await Model.find();
        data.forEach(function(user) {
            users+=`\n ID: ${user._id} , Name: ${user.name}, Age: ${user.age}`;
        });
        res.send(users);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findById(id);
        res.send(`ID: ${data._id} , Name: ${data.name}, Age: ${data.age}`);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

//Update by ID Method
router.patch('/update/:id', async (req, res) => {

    try{
        const id = req.params.id;
        const data = await Model.findByIdAndUpdate(id, {
            name: req.body.name, age: req.body.age
        })
        res.send(`Entry ${data.name}, ${data.age} updated to ${req.body.name}, ${req.body.age}`);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
});

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted`);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});