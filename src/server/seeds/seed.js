const sequelize = require("../config/sequelize");
const { User, Post, Category } = require("../models");

const userData = require("./userData.json");
const postData = require("./posts.json");
const categoryData = require("./categoryData.json");

const seedDatabase = async () => {
  try {
    // Sync all models and clear the database
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    // Seed users, using individualHooks to ensure password hashing
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    console.log("\n----- USERS SEEDED -----\n");

    // Seed categories
    const categories = await Category.bulkCreate(categoryData, {
      returning: true,
    });
    console.log("\n----- CATEGORIES SEEDED -----\n");

    // Seed posts and assign a random user to each one
    for (const post of postData) {
      // Assign a random user's ID to the post
      const randomUser = users[Math.floor(Math.random() * users.length)];
      await Post.create({
        ...post,
        userId: randomUser.id,
      });
    }
    console.log("\n----- POSTS SEEDED -----\n");

    // --- Create Many-to-Many Relationships ---
    const allPosts = await Post.findAll();
    const allCategories = await Category.findAll();

    for (const post of allPosts) {
      // Assign 1 to 3 random categories to each post
      const numCategories = Math.floor(Math.random() * 3) + 1;
      const shuffledCategories = allCategories.sort(() => 0.5 - Math.random());
      const selectedCategories = shuffledCategories.slice(0, numCategories);

      await post.addCategories(selectedCategories);
    }
    console.log("\n----- POST-CATEGORY RELATIONSHIPS SEEDED -----\n");

    console.log("\nDatabase seeding completed successfully!\n");
    process.exit(0);
  } catch (err) {
    console.error("Failed to seed database:", err);
    process.exit(1);
  }
};

seedDatabase();
