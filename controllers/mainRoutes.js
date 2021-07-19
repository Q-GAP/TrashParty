const router = require('express').Router();
const sequelize = require('../config/connection');
const { userTrash, Trash, User } = require('../models');


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
router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.render('dashboard', { username: req.session.username })
    } else {
        User.findAll({
            attributes: ['id', 'username', 'lastOpened']

        }).then((userData) => {
            if (!userData) {
                res.status(404).json({ message: "No one's at the TrashPARTY YET!! \n or Your data's corrupt. . ." })
                return;
            }

            const users = userData.map(user => user.get({ plain: true }));

            res.render('splash', { users, loggedIn: !req.session.loggedIn });

        })
    }
})

router.get('/dashboard', (req, res) => {
    // if (req.session.loggedIn) {
    User.findAll({
            where: {
                // use the ID from the session
                user_id: req.session.id
            },
            attributes: [
                'id',
                'username',
                'lastOpened'
            ],
            include: [{
                model: userTrash,
                attributes: ['id', 'inLandfill', 'trashId']
                    // }
                    // ,{
                    //     include: [{
                    //         model: Trash,
                    //         attributes: ['id', 'name', 'image', 'category', 'rarity']
                    //     }]
            }]

        }).then(dashData => {
            const dashinfo = dashData.map(item => item.get({ plain: true }))
            res.render('dashboard', dashinfo)
        })
        // }
})


module.exports = router