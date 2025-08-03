const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");

class Category extends Model {}

Category.init(
  {
    category_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);

// Export Post model
module.exports = Category;
