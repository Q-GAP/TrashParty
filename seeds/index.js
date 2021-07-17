const sequelize = require('../config/connection')
const seedUsers = require("./usersData")
const seedTrash = require("./trashData")
const seedUsersTrash = require("./usersTrashData")

const seedAll = async () => {
    await sequelize.sync({force: true})

    await seedUsers();

    await seedTrash();

    await seedUsersTrash();

    process.exit(0);
}

seedAll();
