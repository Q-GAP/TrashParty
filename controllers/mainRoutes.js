const router = require('express').Router();
const sequelize = require('../config/connection');
const { userTrash, Trash, User } = require('../models');


//If the user is logged in, redirect to dashboard. If not render the login page.

router.get('/login', (req, res) => {
    // if (req.session.loggedIn){
    //     res.redirect('/dashboard');
    // }else{
    res.render('login');
    return;
});


// TODO: FINISH ROUTE
router.get('/', (req, res) => {
    // if (loggedIn) {
    //     User.findall({
    //         attributes: ['id', 'username', 'lastPackOpened', '']

    //     })


    // } else

    //     User.findall({
    //     attributes: ['id', 'lastOpened', 'username']
    // })
    res.render('splash');

});

module.exports = router