const User = require('./User')
const Trash = require('./Trash')
const UserTrash = require('./Usertrash')
const Trade = require('./Trade')



// Super Many-To-Many Relationship

// Trash.belongsToMany(User, {through: UserTrash, unique: false})
// User.belongsToMany(Trash, {through: UserTrash, unique: false})
User.hasMany(UserTrash)
UserTrash.belongsTo(User)
Trash.hasMany(UserTrash)
UserTrash.belongsTo(Trash)

Trade.belongsTo(UserTrash, {as: "getting"})
Trade.belongsTo(UserTrash, {as: "giving"})
Trade.belongsTo(User, {as: "getter"})
User.hasMany(Trade, {foreignKey: "getterId"})
Trade.belongsTo(User, {as: "giver"})
User.hasMany(Trade, {foreignKey: "giverId"})

module.exports = {User, Trash, UserTrash, Trade}