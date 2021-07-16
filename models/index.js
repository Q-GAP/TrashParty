const User = require('./User')
const Trash = require('./Trash')
const UserTrash = require('./Usertrash')



// Super Many-To-Many Relationship

Trash.belongsToMany(User, {through: UserTrash})
User.belongsToMany(Trash, {through: UserTrash})
Trash.hasMany(UserTrash)
UserTrash.belongsTo(Trash)
User.hasMany(UserTrash)
UserTrash.belongsTo(User)

module.exports = {User, Trash, UserTrash}