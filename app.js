const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.set('view engine' , 'ejs');       
app.set('views' , 'views');     

const mongoose = require('mongoose');

const receipesRoute = require('./routes/receipes');

app.use(bodyParser.urlencoded({extended:false}));   
app.use(express.static(path.join(__dirname , 'public'))); 

app.use(receipesRoute);


 
// app.listen(3000);
mongoose.connect('mongodb+srv://mohammedaymanquadri:Ayman2004@cluster0.ig68fbt.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB !'); 
        app.listen(3000);
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
