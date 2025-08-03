// This file handles the business logic for Blog posts, using Sequelize.
// It interacts directly with the data source (in this case, a PostgreSQL database).

const { Post, User } = require("../models"); // Use the associated models

/**
 * Reads all posts from the database, including the author's username.
 * @returns {Promise<Post[]>} A promise that resolves to an array of Post objects.
 */
const getPosts = async () => {
  try {
    // Use include to join the User table and get the username
    return await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"], // Only include the username
        },
      ],
      order: [["updatedAt", "DESC"]],
    });
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
          attributes: ["username"],
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
  try {
    const { title, content } = postData;
    // Spread the postData and add the userId from the session
    return await Post.create({ title, content, userId: userId });
  } catch (error) {
    console.error("Error creating post in database:", error);
    throw error;
  }
};

/**
 * Updates a post, but only if the user is the owner.
 * @param {string} postId - The ID of the post to update.
 * @param {string} userId - The ID of the user attempting the update.
 * @param {object} updatedData - The new data for the post.
 * @returns {Promise<Post|null>} A promise that resolves to the updated Post or null if not found/not authorized.
 */
const updatePost = async (postId, userId, updatedData) => {
  try {
    const { title, content } = updatedData;
    const [affectedRows, [updatedPost]] = await Post.update(
      { title, content },
      {
        where: {
          id: postId,
          userId: userId, // CRITICAL: Ensures the user owns the post
        },
        returning: true, // Return the updated post object
      }
    );
    return affectedRows > 0 ? updatedPost : null;
  } catch (error) {
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
