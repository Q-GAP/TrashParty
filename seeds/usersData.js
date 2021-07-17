const { User } = require('../models')

const userData = [
    {
        username: "TrashMan",
        password: "secrets",
        email: "trash@gmail.com"
    },
    {
        username: "TrashWoman",
        password: "secrets",
        email: "trash1@gmail.com"
    },
    {
        username: "GarbagePerson",
        password: "secrets",
        email: "trash2@gmail.com"
    },
]

const seedUsers = async () => {  
    // Using multiple creates so the password gets hashed
 await User.create(userData[0]);
 await User.create(userData[1]);
 await User.create(userData[2]);
}

module.exports = seedUsers;