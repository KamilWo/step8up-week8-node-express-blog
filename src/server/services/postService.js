// This file handles the business logic for Blog posts, using Sequelize.
// It interacts directly with the data source (in this case, a PostgreSQL database).

const sequelize = require("../config/sequelize");
const { User, Post, Category } = require("../models"); // Use the associated models

/**
 * Reads all posts from the database, optionally filtering by category.
 * @param {string|null} categoryId - The ID of the category to filter by.
 * @returns {Promise<Post[]>} A promise that resolves to an array of Post objects.
 */
const getPosts = async (categoryId = null) => {
  try {
    const findOptions = {
      include: [
        {
          model: User,
          as: "user", // Use the alias from the model association
          attributes: ["username"], // Only include the username
        },
        {
          model: Category,
          as: 'categories', // Use the alias from the model association
          attributes: ['id', 'name'],
          through: { attributes: [] }, // Don't include junction table data
        },
      ],
      order: [["updatedAt", "DESC"]],
    };

    // If a categoryId is provided, add a 'where' clause to the Category include.
    // This tells Sequelize to only return posts associated with that category.
    if (categoryId) {
      findOptions.include[1].where = { id: categoryId };
    }

    return await Post.findAll(findOptions);
  } catch (error) {
    console.error("Error fetching posts from database:", error);
    throw error;
  }
};

/**
 * Retrieves a single post by its ID from the database.
 * @param {string} id - The ID of the post to retrieve.
 * @returns {Promise<Post|null>} A promise that resolves to the Post object if found, otherwise null.
 */
const getPostById = async (id) => {
  try {
    const post = await Post.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
        {
          model: Category,
          as: 'categories', // Use the alias from the model association
          attributes: ['id', 'name'],
          through: { attributes: [] }, // Don't include junction table data
        },
      ],
    });
    return post; // This will be the post object or null
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    throw error;
  }
};

/**
 * Creates a new post for a specific user.
 * @param {object} postData - The data for the new post (title, content).
 * @param {string} userId - The ID of the user creating the post.
 * @returns {Promise<Post>} A promise that resolves to the newly created Post object.
 */
const createPost = async (postData, userId) => {
  const { title, content, categoryIds = [] } = postData;

  // Use a transaction to ensure atomicity
  const t = await sequelize.transaction();

  try {
    const newPost = await Post.create(
      {
        title,
        content,
        userId,
      },
      { transaction: t }
    );

    if (categoryIds.length > 0) {
      await newPost.setCategories(categoryIds, { transaction: t });
    }

    await t.commit();

    return Post.findByPk(newPost.id, {
      include: [{ model: Category, as: "categories" }],
    });
  } catch (error) {
    // If any step fails, roll back the transaction
    await t.rollback();
    console.error("Error creating post in database:", error);
    throw error; // Re-throw the error to be handled by the controller
  }
};

/**
 * Updates a post and its categories, but only if the user is the owner.
 * @param {string} postId - The ID of the post to update.
 * @param {string} userId - The ID of the user attempting the update.
 * @param {object} updatedData - The new data for the post (title, content, categoryIds).
 * @returns {Promise<Post|null>} A promise that resolves to the updated Post or null if not found/not authorized.
 */
const updatePost = async (postId, userId, updatedData) => {
  const { title, content, categoryIds } = updatedData;

  // Use a transaction for atomicity
  const t = await sequelize.transaction();

  try {
    const postToUpdate = await Post.findOne({
      where: { id: postId, userId: userId },
      transaction: t,
    });

    // If post not found or user is not the owner, return null
    if (!postToUpdate) {
      await t.rollback();
      return null;
    }

    postToUpdate.title = title;
    postToUpdate.content = content;
    await postToUpdate.save({ transaction: t });

    if (categoryIds && Array.isArray(categoryIds)) {
      await postToUpdate.setCategories(categoryIds, { transaction: t });
    }

    await t.commit();

    return Post.findByPk(postId, {
      include: [
        { model: User, as: "user", attributes: ["username"] },
        { model: Category, as: "categories", attributes: ["id", "name"], through: { attributes: [] } },
      ],
    });

  } catch (error) {
    // In case of error, roll back the transaction
    await t.rollback();
    console.error(`Error updating post with id ${postId}:`, error);
    throw error;
  }
};

/**
 * Deletes a post, but only if the user is the owner.
 * @param {string} postId - The ID of the post to delete.
 * @param {string} userId - The ID of the user attempting the deletion.
 * @returns {Promise<boolean>} A promise that resolves to true if deleted, false otherwise.
 */
const deletePost = async (postId, userId) => {
  try {
    const affectedRows = await Post.destroy({
      where: {
        id: postId,
        userId: userId, // CRITICAL: Ensures the user owns the post
      },
    });
    // Returns true if 1 row was deleted, false if 0 rows were deleted
    return affectedRows > 0;
  } catch (error) {
    console.error(`Error deleting post with id ${postId}:`, error);
    throw error;
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
