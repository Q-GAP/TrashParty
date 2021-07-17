const router = require('express').Router();
const { Trash, User, UserTrash } = require('../../models')

router.get("/", async(req, res) => {
    try {
        const trashList = await Trash.findAll({
            include: [{model: UserTrash, include:[{model: User, attributes:['username']}]}]
        })
        res.status(200).json(trashList);
    }
    catch (err) {
        res.status(400).json(err)
    }
})

router.get("/:id", async(req, res) => {
    try {
        const trash = await Trash.findByPk(req.params.id, {
            include: [{model: UserTrash, include:[{model: User, attributes:['username']}]}]
        })
        res.status(200).json(trash);
    }
    catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router;