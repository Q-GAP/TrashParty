const router = require('express').Router();
const { User, UserTrash, Trash } = require('../../models')
const bcrypt = require('bcrypt');



// CREATE new user
router.post('/', async(req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.username = dbUserData.username
            req.session.userId = dbUserData.id
            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const dbUserData = await User.findOne({
            where: {
                email: email,
            },
        });

        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        const comparison = await bcrypt.compare(password, dbUserData.password);

        if (!comparison) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = dbUserData.id
            req.session.username = dbUserData.username

            res
                .status(200)
                .json({ user_id: dbUserData.id, user: dbUserData.username, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout
router.post('/logout', (req, res) => {
    // When the user logs out, the session is destroyed
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


//Arbitrary Get Route to just get all users basic public info.
router.get('/', async(req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'lastOpened']
        })
        res.status(200).json(users)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/:id', async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: ["username", "id", "email"],
            include: [{ model: UserTrash, include: [{ model: Trash }] }]
        })
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router;