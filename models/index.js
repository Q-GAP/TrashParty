const User = require('./User.js')
const Trash = require('./Trash.js')
const UsersTrash = require('./UsersTrash.js')



// Super Many-To-Many Relationship

Trash.belongsToMany(User, {through: UsersTrash})
User.belongsToMany(Trash, {through: UsersTrash})
Trash.hasMany(UsersTrash)
UsersTrash.belongsTo(Trash)
User.hasMany(UsersTrash)
UsersTrash.belongsTo(User)

module.exports = {User, Trash, UsersTrash}