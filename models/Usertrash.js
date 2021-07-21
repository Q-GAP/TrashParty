const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const UserTrash = sequelize.define('usertrash', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER
    },
    trashId: {
        type: DataTypes.INTEGER
    },
    inLandfill: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    // ! Had to put timestamps on for lastOpened panel PLEASE TELL ME IF I'm WRONG.
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'usertrash',
})


module.exports = UserTrash;