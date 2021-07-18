const sequelize = require('../config/connection')
const seedUsers = require("./usersData")
const seedTrash = require("./trashData")
const seedUsersTrash = require("./usersTrashData")
const seedAllGifs = require("./gifdata")

const seedBase = async () => {

    await seedUsers();

    await seedTrash();

    await seedUsersTrash();

}

const seedAll = async () => {

    await sequelize.sync({force: true})

    await seedBase()

    await seedAllGifs()


}

seedAll();
