const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'benhvien',     // tên database
  'root',         // user mysql
  '',             // password (nếu có thì điền)
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import model
db.Patient = require('./Patient')(sequelize, Sequelize);

module.exports = db;
