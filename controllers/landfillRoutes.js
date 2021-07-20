const router = require('express').Router();
const sequelize = require('../config/connection');
const { UserTrash, Trash, User } = require('../models');

router.get('/', async(req, res) => {

        const lanfillTrashList = await Trash.findAll({
            where: {
                userId: req.session.userId
            },
            include: [{ model: Trash }]
        })
        const trashList = landfillTrashList.map((trash) => trash.get({ plain: true }))

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