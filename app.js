const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const csurf = require('csurf');                         // to use csrf(cross site response forgery) tokens to provide security to users
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session); //function

app.set('view engine' , 'ejs');       
app.set('views' , 'views');     

const csrfProtection = csurf();
// app.use(csrfProtection);
app.use(flash());

const webApp = new MongoDBStore({
    uri : `mongodb+srv://mohammedaymanquadri:Ayman2004@cluster0.ig68fbt.mongodb.net/Recipe_WebApp`,
    collection : "sessions"   // collection name 
});

const errorRoute = require('./controllers/error');
const recipesRoute = require('./routes/recipes');
const authRoute = require('./routes/auth');
const User = require('./models/user');

app.use(bodyParser.urlencoded({extended:false}));   
app.use(express.static(path.join(__dirname , 'public'))); 

app.use(
    session({ secret: 'my secret' , resave: false , saveUninitialized : false , store : webApp }) // resave and saveUninitialized are kept false in order to improve efficiency and provide more security as it does not change with every req change . 
);






app.use(recipesRoute);
app.use(authRoute);
app.use(errorRoute.get404); 

 
// app.listen(3000);
mongoose.connect('mongodb+srv://mohammedaymanquadri:Ayman2004@cluster0.ig68fbt.mongodb.net/Recipe_WebApp')
    .then(() => {
        console.log('Connected to MongoDB !'); 
        app.listen(3000);
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
