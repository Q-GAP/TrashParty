const router = require('express').Router()
const sequelize = require('../../config/connection');
const {Trash, UserTrash, User} = require("../../models")

router.get("/", async(req, res) => {
    try {
        if(!req.session.userId) {
            res.redirect("/login");
            return;
        }
        const user = await User.findByPk(req.session.userId)
        if((user.lastOpened - Date.now()) >= 43200000 || user.lastOpened == null) {
            let newTrashList = [];
            for(i = 0; i < 5; i++) {
                const rng = (Math.floor(Math.random() * 100) + 1)
                let rarityNum = 3;
                if(rng <= 10) {
                    rarityNum = 1;
                }
                else if(rng <= 35) {
                    rarityNum = 2;
                }
                const chosenTrash = await Trash.findOne({ where: {rarity: rarityNum}, order: sequelize.random()})
                const givenTrash = await UserTrash.create({
                    userId: req.session.userId,
                    trashId: chosenTrash.id
                })
                const fullTrash = await UserTrash.findByPk(givenTrash.id, {
                    include: [{model: Trash}]
                })
                newTrashList.push(fullTrash)
            }
            if(req.session.userId != 1) {
                user.lastOpened = Date.now()
            }
            user.save({fields: ['lastOpened']})
            newTrashList = newTrashList.map((trash) => trash.get({plain: true}))
            console.log(newTrashList)
            res.status(200).json(newTrashList)
        }
        else {
            res.status(405).json({message: "Pack Unavailable"})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

module.exports = router;