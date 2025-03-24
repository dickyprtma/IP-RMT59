'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "email must be unique"
      },
      validate: {
        notEmpty: {
          msg: "email is required"
        },
        notNull: {
          msg: 'email is required'
        },
        isEmail: {
          msg: "Invalid email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password is required"
        },
        notNull: {
          msg: 'password is required'
        },
        len: [5] // [min,max=optional]
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "User",
      validate: {
        notAdmin(value) {
          if (value === "Admin") {
            throw new Error('create admin account is not permitted')
          }
        }
      }
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    emailVerifiedAt: DataTypes.DATE // jangan lupa ditambahkan karena baru saja di tambahkan di migration dan akan diupate

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};