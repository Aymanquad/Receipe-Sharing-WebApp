const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const csrf = require('csurf');                         // to use csrf(cross site response forgery) tokens to provide security to users
const flash = require('connect-flash');
const session = require('express-session');
const request = require('request');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session); //function

app.set('view engine' , 'ejs');       
app.set('views' , 'views');     

app.use(flash());

const webApp = new MongoDBStore({
    uri : `mongodb+srv://mohammedaymanquadri:Ayman2004@cluster0.ig68fbt.mongodb.net/Recipe_WebApp`,
    collection : "sessions"   // collection name 
});

const errorRoute = require('./controllers/error');
const recipesRoute = require('./routes/recipes');
const authRoute = require('./routes/auth');
const User = require('./models/user');
const Public = require('./models/public');
const { log } = require('console');




const csrfProtection = csrf();

app.use(bodyParser.urlencoded({extended:false}));   
app.use(express.static(path.join(__dirname , 'public'))); 

app.use(
    session({ secret: 'my secret' , resave: false , saveUninitialized : true , store : webApp }) // resave and saveUninitialized are kept false in order to improve efficiency and provide more security as it does not change with every req change . 
);
 
app.use(csrfProtection);

app.use((req , res , next) =>{
    res.locals.isAuthenticated = req.session.loggedIn ; 
    res.locals.csrfToken = req.csrfToken() ;             //doing this for the csrf token which will generate and look for a name="_csrf" in our views to assign it a csrf_token 
    next();
})


app.use((req, res, next) => {
    if(!req.session.user) {
        // req.session.destroy();
        // console.log("session destroyed !");
        return next();
    }

    User.findById(req.session.user._id)
        .then(user => {
            if(!user) {
                return next();
            }

            req.user = user;
            next();
        })
        .catch(err => {
            next (new Error(err));
        });
    
});

app.use((req, res, next) => {
    Public.findById('65ca500dcb91aba606f81d75')
        .then(public => {
            if(!public) {
                console.log("No public found !");
                return ;
            }

            req.public = public;
            next();
            })
        .catch(err => {
            console.log(err);
        });
});


//API STUFF
app.post('/search', (req, res) => { // Use POST method instead of GET for form submission
    const query = req.body.query;
    const options = {
        method: 'GET',
        url: 'https://api.edamam.com/search',
        qs: {
            q: query,
            app_id: '42911b65',
            app_key: '933aebee2f1ef3125c5240b8f46a6fdf',
            to: 18 // Limit the number of results
        }
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error(error);
            res.render('error');
        } else {
            const data = JSON.parse(body);
            //console.log("data retreived is ...",data);
            res.render('recipe_stuff/search_recipes', { pgTitle : 'Search' , query, results: data.hits });
        }
    });
});



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
