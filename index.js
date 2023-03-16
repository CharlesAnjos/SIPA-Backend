const routes = require('./routes/routes');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
mongoose.set('strictQuery', false);
//const mongoString = process.env.DATABASE_URL;
//const mongoString = "mongodb+srv://charlesccomp:56JyhU3bDlLFGik3@backend-ntdw.6ntzz31.mongodb.net/backend-ntdw";
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
app.use('/api', routes);
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`);
})

