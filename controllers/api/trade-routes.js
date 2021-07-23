const router = require('express').Router()
const sequelize = require('../../config/connection');
const {Trash, UserTrash, User, Trade} = require("../../models")

router.get("/:id", async (req, res) => {
    try {
        const trade = await Trade.findByPk(req.params.id, {
            include: [{model: UserTrash, as:"giving", include:[{model: Trash}]},
            {model: UserTrash, as:"getting", include:[{model: Trash}]},
            {model: User, as:"giver", attributes:["username", "id"]},
            {model: User, as:"getter", attributes:["username", "id"]},
        ]
        })
        res.status(200).json(trade)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get("/accept/:id", async (req, res) => {
    try {
        const trade = await Trade.findByPk(req.params.id, {
            include: [{model: UserTrash, as:"giving", include:[{model: Trash}]},
            {model: UserTrash, as:"getting", include:[{model: Trash}]},
            {model: User, as:"giver", attributes:["username", "id"]},
            {model: User, as:"getter", attributes:["username", "id"]},
        ]
        })
        if(trade.giverId == req.session.userId) {
            const givenTrash = await UserTrash.findByPk(trade.giving.id)
            const gettingTrash = await UserTrash.findByPk(trade.getting.id)
            const getterId = gettingTrash.userId
            const giverId = givenTrash.userId
            givenTrash.userId = getterId
            gettingTrash.userId = giverId
            givenTrash.save()
            gettingTrash.save()
            const deletedTrades = await Trade.destroy({where: {givingId: givenTrash.id}})
            const deletedTrades2 = await Trade.destroy({where: {givingId: gettingTrash.id}})
            const deletedTrades3 = await Trade.destroy({where: {gettingId: givenTrash.id}})
            const deletedTrades4 = await Trade.destroy({where: {gettingId: gettingTrash.id}})
            res.status(200).json({message: "Trade Successful"})
        }
        else {
            res.status(400).json({message: "Not Your Trash"})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const trade = await Trade.findByPk(req.params.id, {
            include: [{model: UserTrash, as:"giving", include:[{model: Trash}]},
            {model: UserTrash, as:"getting", include:[{model: Trash}]},
            {model: User, as:"giver", attributes:["username", "id"]},
            {model: User, as:"getter", attributes:["username", "id"]},
        ]
        })
        if(trade.giverId == req.session.userId || trade.getterId == req.session.userId) {
            trade.destroy()
            res.status(200).json({message: "Trade Deleted"})
        }
        else {
            res.status(400).json({message: "Not Your Trash"})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post("/", async (req, res) => {
    try {
        const getting = await UserTrash.findByPk(req.body.gettingId, {
            include: [{model: User,  attributes: ["username", "id"]}]
        })
        const giving = await UserTrash.findByPk(req.body.givingId, {
            include: [{model: User,  attributes: ["username", "id"]}]
        })
        if(getting.user.id == req.session.userId) {
            const trade = await Trade.create({
                getterId: getting.user.id,
                giverId: giving.user.id,
                gettingId: getting.id,
                givingId: giving.id
            })
            res.status(200).json(trade)
        }
        else {
            res.status(400).redirect("/")
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router;