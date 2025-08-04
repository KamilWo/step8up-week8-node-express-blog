// Import models
const User = require("./user");
const Post = require("./post");
const Category = require("./category");

// Create the association: A User can have many Posts
User.hasMany(Post, {
  as: "posts", // Alias for the association
  foreignKey: {name: "userId"},
  onDelete: "CASCADE", // If a user is deleted, their posts are also deleted
  hooks: false,
  name: {plural: "posts", singular: "post"},
});

// A Post belongs to a single User
Post.belongsTo(User, {
  as: "user", // Alias for the association
  foreignKey: "userId",
});

// Create the association: A Post can have many Categories
Post.belongsToMany(Category, {
  as: "categories", // Alias for the association
  foreignKey: {name: "postId"},
  through: "post_category", // The name of the junction table
  otherKey: {name: "categoryId"},
  throughAssociations: {},
  hooks: false,
  name: {plural: "categories", singular: "category"},
});

// Create the association: A Category can have many Posts
Category.belongsToMany(Post, {
  as: "posts",
  foreignKey: {name: "categoryId"},
  through: "post_category", // Must be the same junction table name
});

module.exports = {
  User,
  Post,
  Category,
};
