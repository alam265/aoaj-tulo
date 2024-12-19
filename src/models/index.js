const sequelize = require('../config/database');
const User = require('./User');




// Sync all models
sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  User,



};