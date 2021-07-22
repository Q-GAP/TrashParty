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
            const gettingId = gettingTrash.userId
            const givingId = givenTrash.userId
            givenTrash.userId = gettingId
            gettingTrash.userId = givingId
            givenTrash.save()
            gettingTrash.save()
            trade.destroy()
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
                getterId: giving.user.id,
                giverId: getting.user.id,
                gettingId: getting.id,
                givingId: giving.id
            })
            res.status(200).json(trade)
        }
        else {
            res.status(400).redirect("/dashboard")
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router;