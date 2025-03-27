'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserCourse.init({
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "userId is required"
        },
        notNull: {
          msg: 'userId is required'
        }
      }
    },
    CourseId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "courseId is required"
        },
        notNull: {
          msg: 'courseId is required'
        }
      }
    },
    favorite: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserCourse',
  });
  return UserCourse;
};