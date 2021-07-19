const router = require('express').Router();
const sequelize = require('../config/connection');
const { Trash, User, UserTrash } = require('../models');


//If the user is logged in, redirect to dashboard. If not render the login page.

router.get('/login', (req, res) => {
    res.render('login');
    return;
});
router.get('/signup', (req, res) => {
    res.render('login');
    return;
});

// TODO: FINISH ROUTE
router.get('/', async (req, res) => {

    res.render('splash')
        // if (loggedIn) {
        //     User.findall({
        //         attributes: ['id', 'username', 'lastPackOpened', '']


    //     })

    // } else

    //     User.findall({
    //     attributes: ['id', 'lastOpened', 'username']
    // })
    // res.render('splash');

});

router.get('/collection', async (req, res) => {
    const userTrashList = await UserTrash.findAll({where: {userId: 1}, include:[{model: Trash}]})
    const trashList = userTrashList.map((trash) => trash.get({plain:true}))

    res.render('collection', {
        trashList: trashList
    })
})

module.exports = router