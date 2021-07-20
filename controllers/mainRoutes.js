const router = require('express').Router();
const sequelize = require('../config/connection');
const { UserTrash, Trash, User } = require('../models');


router.get('/', async(req, res) => {
    if (req.session.loggedIn) {
        await User.findAll({
            attributes: ['id', 'username', 'lastOpened'],
        }).then((userData) => {
            if (!userData) {
                res.status(404).json({ message: "No one's at the TrashPARTY YET!! \n or Your data's corrupt. . ." })
                return;
            }

            const users = userData.map(user => user.get({ plain: true }));
            console.log('\n \n users:' + JSON.stringify(users) + '\n \n');



            res.render('splash', { users, username: req.session.username, loggedIn: req.session.loggedIn });
        })
    } else {
        res.render('splash', { loggedIn: false })
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
                username: req.session.userId
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
            res.render('dashboard', { userInfo, username: req.session.username, loggedIn: req.session.loggedIn })
        })
    } else {
        res.status(200).redirect('/login')
    }
})


router.get('/collection', async(req, res) => {
        const TP_example = {
            id: 999999999999999,
            userId: req.session.userId,
            trashId: 999999999999999,
            inLandfill: false,
            createdAt: "1-07-20T02:06:16.000Z",
            "updatedAt": "1-07-20T02:06:16.000Z",
            trash: {
                id: 99999999999,
                name: "Example Trash",
                image: "https://media.giphy.com/media/J6i3kTM5Rrv2cElk6y/giphy.gif",
                category: "Example",
                rarity: 1
            }
        }
        const userTrashList = await UserTrash.findAll({ where: { userId: req.session.userId }, include: [{ model: Trash }] })
        const trashList = userTrashList.map((trash) => trash.get({ plain: true }))
        console.log('\n \n TRASHLIST: \n' + trashList.length + '\n \n')
        if (trashList.length == 0) {
            console.log('\n \n IF \n \n')
            trashList.push(TP_example)
            console.log('\n \n UPDATED TRASHLIST: \n \n ' + JSON.stringify(trashList))
            res.render('collection', {
                loggedIn: req.session.loggedIn,
                trashList: trashList
            })
        } else {
            console.log('\n \nELSE \n \n')
            res.render('collection', {
                loggedIn: req.session.loggedIn,
                trashList: trashList
            })
        }
    }) // catch ((err) => {
    //     console.log(err);
    //     res.status(401).redirect('/');



module.exports = router