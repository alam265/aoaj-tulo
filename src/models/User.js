const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  Username: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  _id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true
  },
  Name: {
    type: DataTypes.STRING(100),
  },
  Email: {
    type: DataTypes.STRING(100),
    unique: true
  },
  Password: {
    type: DataTypes.STRING(255),
  },

  NID: {
    type: DataTypes.STRING,
    validate: {
      isValidNID(value) {
        if (!/^\d{10}$/.test(value) && !/^\d{13}$/.test(value)) {
          throw new Error('NID must be either 10 or 13 digits');
        }
      }
    }
  }
}, {
  tableName: 'User',
  timestamps: false
});

module.exports = User;
