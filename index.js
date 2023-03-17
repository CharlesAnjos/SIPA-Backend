const premioroutes = require('./routes/premioroutes');
const autorroutes = require('./routes/autorroutes');
const avaliadorroutes = require('./routes/avaliadorroutes');
const projetoroutes = require('./routes/projetoroutes');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
mongoose.set('strictQuery', false);
const mongoString = "mongodb://localhost:27017/backend-ntdw"

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());
app.use('/api', premioroutes);
app.use('/api', autorroutes);
app.use('/api', avaliadorroutes);
app.use('/api', projetoroutes);
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`);
})

