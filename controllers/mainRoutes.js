const router = require('express').Router();
const sequelize = require('../config/connection');
const { UserTrash, Trash, User, Trade } = require('../models');


router.get('/', async(req, res) => {
    if (req.session.loggedIn) {
        await User.findAll({
            attributes: ['id', 'username', 'lastOpened', 'updatedAt'],
            order: [
                ['updatedAt', 'DESC']
            ],
            limit: 5
        }).then((userData) => {
            if (!userData) {
                res.status(404).json({ message: "No one's at the TrashPARTY YET!! \n or Your data's corrupt. . ." })
                return;
            }

            const users = userData.map(user => user.get({ plain: true }));
            console.log('\n \n users:' + JSON.stringify(users) + '\n \n');



            res.render('splash', { layout: 'main', users: users, username: req.session.username, loggedIn: req.session.loggedIn });
        })
    } else {
        await User.findAll({
            attributes: ['id', 'username', 'lastOpened', 'updatedAt'],
            order: [
                ['updatedAt', 'DESC']
            ],
            limit: 5
        }).then((userData) => {
            if (!userData) {
                res.status(404).json({ message: "No one's at the TrashPARTY YET!! \n or Your data's corrupt. . ." })
                return;
            }

            const users = userData.map(user => user.get({ plain: true }));
            console.log('\n \n users:' + JSON.stringify(users) + '\n \n');

            res.render('splash', { users: users, loggedIn: false })
        })
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

router.get('/dashboard', async (req, res) => {
    if (req.session.loggedIn) {
       const user = await User.findByPk(req.session.userId, {
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
            }, {model: Trade, as: "trades"}]



            // attributes: ['id', 'name', 'image', 'category', 'rarity'],

        })
            const userInfo = user.get({ plain: true })
            res.render('dashboard', { userInfo, username: req.session.username, loggedIn: req.session.loggedIn })  
    } else {
        res.status(200).redirect('/login')
    }
})

router.get('/trades', async (req, res) => {
    try {
        if(req.session.loggedIn) {
        let tradeRequests = await Trade.findAll({
            where: {giverId: req.session.userId},
            include: [{model: UserTrash, as:"giving", include:[{model: Trash}]},
            {model: UserTrash, as:"getting", include:[{model: Trash}]},
            {model: User, as:"giver", attributes:["username", "id"]},
            {model: User, as:"getter", attributes:["username", "id"]},
          ]
        })

        let pendingTrades = await Trade.findAll({
            where: {getterId: req.session.userId},
            include: [{model: UserTrash, as:"giving", include:[{model: Trash}]},
            {model: UserTrash, as:"getting", include:[{model: Trash}]},
            {model: User, as:"giver", attributes:["username", "id"]},
            {model: User, as:"getter", attributes:["username", "id"]},
          ]
        })

        pendingTrades = pendingTrades.map((trade) => trade.get({plain: true}))
        tradeRequests = tradeRequests.map((trade) => trade.get({plain: true}))
        console.log(pendingTrades)
        res.render('trades', {tradeRequests, pendingTrades, username: req.session.username, userid: req.session.userId, loggedIn: req.session.loggedIn})
    }
    else {
        res.status(200).redirect('/login')
    }
}
    catch (err) {
        console.log(err)
        res.status(500).json(err)
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
    try {
        const userTrashList = await UserTrash.findAll({ where: { userId: req.session.userId, inLandfill: false }, include: [{ model: Trash }], order: [
            ['updatedAt', 'DESC']
        ] })
        const trashList = userTrashList.map((trash) => trash.get({ plain: true }))
        if (trashList.length == 0) {
            trashList.push(TP_example)
            res.render('collection', {
                loggedIn: req.session.loggedIn,
                trashList: trashList,
                username: req.session.username
            })
        } else {
            res.render('collection', {
                loggedIn: req.session.loggedIn,
                trashList: trashList,
                username: req.session.username
            })
        }
    } catch (err) {
        console.log(err);
        res.status(401).redirect('/');

    }
})

router.get('/user/:id', async(req, res) => {
    try {
        const userTrashList = await UserTrash.findAll({ where: { userId: req.params.id, inLandfill: false }, include: [{ model: Trash }, {model: User, attributes: ["username"]}], order: [
            ['updatedAt', 'DESC']
        ] })
        const trashList = userTrashList.map((trash) => trash.get({ plain: true }))
        if (trashList.length == 0) {
            res.render('userPage', {
                loggedIn: req.session.loggedIn,
                trashList: trashList,
                username: "Nobody"
            })
        } else {
            res.render('userPage', {
                loggedIn: req.session.loggedIn,
                trashList: trashList,
                username: trashList[0].user.username
            })
        }
    } catch (err) {
        console.log(err);
        res.status(401).redirect('/');

    }
})

router.get('/landfill', async(req, res) => {
    try {
        const landfill = await UserTrash.findAll({ where: { inLandfill: true }, include: [{ model: Trash }, {model: User, attributes: ["username", "id"]}], order: [
            ['updatedAt', 'DESC']
        ] })
        const landfillList = landfill.map((trash) => trash.get({ plain: true }))
        res.render('landfill', {
            loggedIn: req.session.loggedIn,
            trashList: landfillList
        })
    } catch (err) {
        console.log(err);
        res.status(401).redirect('/');

    }
})

router.get('/request/:id', async(req, res) => {
    try {
        if(req.session.loggedIn) {
            const collection = await UserTrash.findAll({ where: { inLandfill: false, userId: req.session.userId }, include: [{ model: Trash }, {model: User, attributes: ["username", "id"]}], order: [
                ['updatedAt', 'DESC']
            ] })
            const collectionList = collection.map((trash) => trash.get({ plain: true }))
            res.render('requesttrade', {
                loggedIn: req.session.loggedIn,
                givingId: req.params.id,
                trashList: collectionList
            })
        }
        else {
            res.redirect("/login")
        }
    } catch (err) {
        console.log(err);
        res.status(401).redirect('/');

    }
})

router.get('/pack', async(req, res) => {
    try {
        if (!req.session.userId) {
            res.redirect("/login");
            return;
        }
        const user = await User.findByPk(req.session.userId)
        if ((Date.now() - user.lastOpened) >= 43200000 || user.lastOpened == null) {
            let newTrashList = [];
            for(i = 0; i < 6; i++) {
                const rng = (Math.floor(Math.random() * 100) + 1)
                let rarityNum = 3;
                if (rng <= 10) {
                    rarityNum = 1;
                } else if (rng <= 35) {
                    rarityNum = 2;
                }
                const chosenTrash = await Trash.findOne({ where: { rarity: rarityNum }, order: sequelize.random() })
                const givenTrash = await UserTrash.create({
                    userId: req.session.userId,
                    trashId: chosenTrash.id
                })
                const fullTrash = await UserTrash.findByPk(givenTrash.id, {
                    include: [{ model: Trash }]
                })
                newTrashList.push(fullTrash)
            }
            if (req.session.userId != 1) {
                user.lastOpened = Date.now()
            }
            user.save({ fields: ['lastOpened'] })
            newTrashList = newTrashList.map((trash) => trash.get({ plain: true }))
            console.log(newTrashList)
            res.render('newpack', { trashList: newTrashList, loggedIn: req.session.loggedIn, username: user.username })
        } else {
            res.render('nopack', { loggedIn: req.session.loggedIn })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})


module.exports = router