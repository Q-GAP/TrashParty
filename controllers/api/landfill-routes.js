const router = require('express').Router();
const { Trash, User, UserTrash } = require('../../models')

const landfillUpdate = async () => {
    const landfillList = await UserTrash.findAll({where: {inLandfill: true}, order: [
        ['updatedAt', 'DESC']
    ],})
    landfillList.forEach((trash) => {
        if(trash.updatedAt - Date.now() >= 86400000) {
            trash.destroy()
        }
    })
    if(landfillList.length > 100) {
        landfillList[(landfillList.length - 1)].destroy()
    }
    console.log(landfillList.length)
    return;
}

router.get('/:id', async (req, res) => {
    try {
        await landfillUpdate();
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

router.put('/:id', async (req, res) => {
    try {
        await landfillUpdate();
        const movingTrash = await UserTrash.findByPk(req.params.id)
        if(req.session.userId && movingTrash.inLandfill == true) {
            movingTrash.inLandfill = false;
            movingTrash.userId = req.session.userId
            movingTrash.save()
            res.status(200).json(movingTrash);
        }
        else if(req.session.userId && movingTrash.inLandfill == false){
            res.status(400).json({message: "Too Slow"})
        }
        else {
            res.redirect("/")
        }
    }
    catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router;