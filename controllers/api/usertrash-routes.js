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

router.get('/landfill/:id', async (req, res) => {
    try {
        const movingTrash = await UserTrash.findByPk(req.params.id)
        if(movingTrash.userId = req.session.userId) {
            movingTrash.inLandfill = true;
            movingTrash.save()
            res.status(200).json(movingTrash);
        }
        else {
            res.status(400).json({message: "Trash does not belong to you"})
        }
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