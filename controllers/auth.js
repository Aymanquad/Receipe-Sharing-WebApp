const User = require('../models/user');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');  //using this email service to notify the newly logged in user in their mail
// const crypto = require('crypto');
const bcrypt = require('bcryptjs');


const transporter = nodemailer.createTransport(sendgridTransport({
    auth :{
      api_key : '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'
    }
  }));
  


 
exports.getSignUp = (req,res,next) =>{

    let errMsg = req.flash('err');
    if(errMsg.length >0){
        errMsg = errMsg[0]; 
    }
    else{
        errMsg = null;
    }



    res.render('auth/signup',{
        pgTitle: 'Sign-In ',
        path: '/signup',
        errorMsg : errMsg,
    })
};

exports.postSignUp = (req,res,next)=>{
    const name = req.body.name ;
    const email = req.body.email ;
    const password = req.body.password ;

    User.findOne({email : email})
        .then(Userdoc =>{
            if(Userdoc){  //already a user
                req.flash('err', 'User with this email already exists.');
                return res.redirect('/signup');
            }

            //new User
            return bcrypt.hash(password , 12) //12 default
                .then(hashedpassword =>{
                    //adding new user to db
                    const user = new User({  id : null , name : name , email : email , password : hashedpassword , my_recipes : [] , my_favourites : [] , resetToken : null , resetTokenExpiry : null});
                    return user.save();
                    }).then(result =>{
                        res.redirect('/login');
                        return transporter.sendMail({
                            to : email ,
                            from : 'mohammedaymanquadri@gmail.com',
                            subject : "Sign In Succeeded !",
                            html : '<h1>You Successfully signed In </h1>'
                        })
                        })
                        .catch(err=>{
                        console.log(err); 
                        })
        })
        .catch(err=>{
            console.log(err); 
        })
}




exports.getLogin = (req,res,next) =>{

    let errMsg = req.flash('err');
    let pswderrMsg = req.flash('pswderr');
    if(errMsg.length >0){
        errMsg = errMsg[0]; 
    }
    else{
        errMsg = null;
    }
    if(pswderrMsg.length >0){
        pswderrMsg = pswderrMsg[0]; 
    }
    else{
        pswderrMsg = null;
    }



    res.render('auth/login',{
        pgTitle: 'Login ',
        path: '/login',
        errorMsg : errMsg ,
        pswderrMsg : pswderrMsg,
    })
};


exports.postLogin = (req,res,next) =>{
    const email = req.body.email ;
    const password = req.body.password ;

    User.findOne({email : email})
        .then(Userdoc =>{
            if(Userdoc){ //existing user
                bcrypt.compare(password , Userdoc.password)
                    .then(doMatch =>{
                        req.session.loggedIn = true;
                        req.session.user = new User({_id : Userdoc._id ,name : Userdoc.name , email :Userdoc.email ,password : Userdoc.password ,my_recipes: Userdoc.my_recipes ,my_favourites: Userdoc.my_favourites ,resetToken : Userdoc.resetToken ,resetTokenExpiry: Userdoc.resetTokenExpiry}) ;
                        
                        return req.session.save(err => {
                            if (err) {
                                console.log(err);
                            }
                                res.redirect('/');
                            })
                    })
                    .catch(err =>{ // password doesn't match
                        console.log(err);
                        req.flash('pswderr','Invalid password.'); 
                        return res.redirect('/login');
                    })
                
            } 
            else{ //not a user 
                
                req.flash('err','Invalid email or password.'); 
                return res.redirect('/login');
                  
            }


        })
};



exports.postLogout = (req ,res , next)=>{
    req.session.destroy((err) =>{
        if(err){console.log(err);}
        res.redirect('/');
      });
};



exports.getresetPasswordPage = (req,res,next) =>{
    res.render('auth/reset',{
        pgTitle: 'Reset ',
        path: '/reset',
    })
};





exports.getNewPasswordPage = (req,res,next) =>{
    res.render('auth/new-password',{
        pgTitle: 'New Password',
        path: '/new-password',
    })
};