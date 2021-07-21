const User = require('./User')
const Trash = require('./Trash')
const UserTrash = require('./Usertrash')



// Super Many-To-Many Relationship

// Trash.belongsToMany(User, {through: UserTrash, unique: false})
// User.belongsToMany(Trash, {through: UserTrash, unique: false})
User.hasMany(UserTrash)
UserTrash.belongsTo(User)
Trash.hasMany(UserTrash)
UserTrash.belongsTo(Trash)

module.exports = {User, Trash, UserTrash}