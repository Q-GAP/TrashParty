const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trash extends Model {}

Trash.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rarity: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'trash',
})

module.exports = Trash;