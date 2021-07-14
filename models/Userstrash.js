const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UsersTrash extends Model{}

UsersTrash.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      inLandfill: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'usersTrash',
})


module.exports = UsersTrash;