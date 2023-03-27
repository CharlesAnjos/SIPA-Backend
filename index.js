const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const premioroutes = require('./routes/premioroutes');
const etaparoutes = require('./routes/etaparoutes');
const pessoaroutes = require('./routes/pessoaroutes');

const autorroutes = require('./routes/autorroutes');
const avaliadorroutes = require('./routes/avaliadorroutes');
const projetoroutes = require('./routes/projetoroutes');

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
//done
app.use('/premio', premioroutes);
app.use('/etapa', etaparoutes);
app.use('/pessoa', pessoaroutes);
//doing
//to do
app.use('/autor', autorroutes);
app.use('/projeto', projetoroutes);
app.use('/avaliador', avaliadorroutes);
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`);
})

