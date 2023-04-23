const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = db.define(
  'users',
  {
    idUser: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(220),
      allowNull: false,
      require: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      require: true,
    },
    senha: {
      type: DataTypes.STRING(220),
      allowNull: false,
      require: true,
    },
  },
  { timestamps: false, freezeTableName: true },
);

module.exports = User;
