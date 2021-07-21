const router = require('express').Router();
const { Trash, User, UserTrash } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const trashList = await UserTrash.findAll({
            include: [{model: User, attributes:["username"]},
        {model: Trash}]
        })
        res.status(200).json(trashList);
    }
    catch (err) {
        res.status(400).json(err)
    }
})

router.post('/', async (req, res) => {
    try {
        // const newTrash = await UserTrash.create({
        //     userId: req.session.userId,
        //     trashId: req.body.trashId
        // })
        const newTrash = await UserTrash.create(req.body)
        res.status(200).json(newTrash);
    }
    catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router;