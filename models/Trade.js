const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Trade = sequelize.define('trade', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    gettingId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    givingId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    getterId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    giverId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'trade',
})

module.exports = Trade;