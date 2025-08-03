// import all models
const User = require("./user");
const Post = require("./post");
const Category = require("./category");

// Create the association: A User can have many Posts
User.hasMany(Post, {
  foreignKey: "userId",
  onDelete: "CASCADE", // If a user is deleted, their posts are also deleted
  as: "posts",
});

// A Post belongs to a single User
Post.belongsTo(User, {
  foreignKey: "userId",
});

// Create the association: A Post can have many Categories
Post.belongsToMany(Category, {
  through: "post_category", // The name of the junction table
  foreignKey: "postId",
  as: "categories",
});

// Create the association: A Category can have many Posts
Category.belongsToMany(Post, {
  through: "post_category", // Must be the same junction table name
  foreignKey: "categoryId",
  as: "posts",
});

module.exports = {
  User,
  Post,
  Category,
};
