const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


const Trash = sequelize.define('trash', {
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
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING
    },
    rarity: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'trash',
})

module.exports = Trash;