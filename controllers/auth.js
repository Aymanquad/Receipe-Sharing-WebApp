const User = require('../models/user');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');  //using this email service to notify the newly logged in user in their mail
// const crypto = require('crypto');
const bcrypt = require('bcryptjs');


 
exports.getSignUp = (req,res,next) =>{
    res.render('auth/signup',{
        pgTitle: 'Sign-In ',
        path: '/signup',
    })
};




exports.getLogin = (req,res,next) =>{
    res.render('auth/login',{
        pgTitle: 'Login ',
        path: '/login',
    })
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