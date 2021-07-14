const Sequelize = require("Sequelize");
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_Password,

        {
            host: 'localhost',
            dialect: 'mqsql',
            port: 3306,

        }
    );
}

module.exports = sequelize;