const router = require('express').Router();
const sequelize = require('../config/connection');
const {userTrash, Trash, User } = require('../models');


//If the user is logged in, redirect to dashboard. If not render the login page.

router.get('/login', (req,res)=>{
    if (req.session.loggedIn){
        res.redirect('/dashboard');
    }else{
    res.render('login');
    return;
    }
});

router.get('/', (req,res)=>{
    User.findall({
        attributes:['id']
    })

})