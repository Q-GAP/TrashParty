const User = require('./User')
const Trash = require('./Trash')
const UsersTrash = require('./UsersTrash')



// Super Many-To-Many Relationship

Trash.belongsToMany(User, {through: UsersTrash})
User.belongsToMany(Trash, {through: UsersTrash})
Trash.hasMany(UsersTrash)
UsersTrash.belongsTo(Trash)
User.hasMany(UsersTrash)
UsersTrash.belongsTo(User)

module.exports = {User, Trash, UsersTrash}