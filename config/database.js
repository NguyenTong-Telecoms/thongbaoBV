const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('benhvien', 'root', '', {
host: 'localhost',
dialect: 'mysql'
});


module.exports = sequelize;