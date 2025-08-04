const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Category",
    tableName: "categories",
  }
);

// Export Post model
module.exports = Category;
