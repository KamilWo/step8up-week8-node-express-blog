const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT, // TEXT is better for long-form blog content
      allowNull: false,
    },
    // This is the foreign key that links a post to a user
    // The 'userId' casing is automatically handled by the association in models/index.js
    userId: {
      type: DataTypes.UUID,
      references: {
        model: "users", // This should match the table name of the User model
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "Post",
    tableName: "posts",
  }
);

// Export Post model
module.exports = Post;
