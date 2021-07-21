const router = require('express').Router();
const { Trash, User, UserTrash } = require('../../models')

router.get('/:id', async (req, res) => {
    try {
        const movingTrash = await UserTrash.findByPk(req.params.id)
        if(movingTrash.userId == req.session.userId) {
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

router.get('/claim/:id', async (req, res) => {
    try {
        const movingTrash = await UserTrash.findByPk(req.params.id)
        if(req.session.userId) {
            movingTrash.inLandfill = false;
            movingTrash.userId = req.session.userId
            movingTrash.save()
            res.status(200).json(movingTrash);
        }
        else {
            res.redirect("/login")
        }
    }
    catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router;