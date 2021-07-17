const { UserTrash } = require("../models")

const usersTrashData = [
    {
        userId: 1,
        trashId: 1,
        inLandfill: false
    },
    {
        userId: 1,
        trashId: 2,
        inLandfill: false
    },
    {
        userId: 1,
        trashId: 3,
        inLandfill: false
    },
    {
        userId: 2,
        trashId: 1,
        inLandfill: false
    },
    {
        userId: 2,
        trashId: 4,
        inLandfill: false
    },
    {
        userId: 3,
        trashId: 5,
        inLandfill: false
    }
]

const seedUsersTrash = () => UserTrash.bulkCreate(usersTrashData)

module.exports = seedUsersTrash;