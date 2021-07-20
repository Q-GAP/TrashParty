const router = require('express').Router();
const sequelize = require('../config/connection');
const { UserTrash, Trash, User } = require('../models');


router.get('/', async(req, res) => {
    if (req.session.loggedIn) {
        User.findAll({
            attributes: ['id', 'username', 'lastOpened'],
        }).then((userData) => {
            if (!userData) {
                res.status(404).json({ message: "No one's at the TrashPARTY YET!! \n or Your data's corrupt. . ." })
                return;
            }

            const users = userData.map(user => user.get({ plain: true }));
            console.log('\n \n users:' + JSON.stringify(users) + '\n \n');
            res.render('dashboard');
        })
    } else {
        res.render('splash')
    }
})

//If the user is logged in, redirect to dashboard. If not render the login page.

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard')
    } else {
        res.render('login');
        return;
    }
});
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard')
    }
    res.render('login');
    return;
});

router.get('/dashboard', (req, res) => {
    if (req.session.loggedIn) {
        User.findAll({
            where: {
                // use the ID from the session
                username: req.session.username
            },
            attributes: [
                "id",
                "username",
                "email",
                'lastOpened'
            ],
            include: [{
                model: UserTrash,
                include: [{
                    model: Trash
                }]
            }]



            // attributes: ['id', 'name', 'image', 'category', 'rarity'],

        }).then(dashData => {
            console.log('\n \n dashData: \n' + dashData + '\n \n')
            const dashInfo = dashData.map(item => item.get({ plain: true }))
            const userInfo = dashInfo[0]
            console.log('\n \n userInfo: \n' + JSON.stringify(dashInfo[0]) + '\n \n')
            res.render('dashboard', { userInfo, loggedIn: req.session.loggedIn })
        })
    } else {
        res.status(200).redirect('/login')
    }
})


router.get('/splash', (req, res) => {
    res.render('splash')
})

router.get('/collection', async (req, res) => {
    const userTrashList = await UserTrash.findAll({where: {userId: 1}, include:[{model: Trash}]})
    const trashList = userTrashList.map((trash) => trash.get({plain:true}))

    res.render('collection', {
        trashList: trashList
    })
})

module.exports = router