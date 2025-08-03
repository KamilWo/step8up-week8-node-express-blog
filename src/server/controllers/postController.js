// This file contains the logic for handling HTTP requests related to posts.
// It interacts with the postService to perform CRUD operations.

const postService = require("../services/postService");

/**
 * Get all posts.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to retrieve posts." });
  }
};

/**
 * Get a single post by ID.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const getPost = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Failed to retrieve post." });
  }
};

/**
 * Create a new post.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const createPost = async (req, res) => {
  try {
    // Get the userId from the session object
    const userId = req.session.user.id;
    const post = await postService.createPost(req.body, userId);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post." });
  }
};

/**
 * Update an existing post.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.session.user.id;
    const updatedPost = await postService.updatePost(postId, userId, req.body);

    if (!updatedPost) {
      return res
        .status(404)
        .json({ message: "Post not found or you are not the owner." });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to update post." });
  }
};

/**
 * Delete a post.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.session.user.id;
    const success = await postService.deletePost(postId, userId);

    if (!success) {
      return res
        .status(404)
        .json({ message: "Post not found or you are not the owner." });
    }
    res.status(204).end(); // Success, no content
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post." });
  }
};

module.exports = {
  getAllPosts: getAllPosts,
  getPost: getPost,
  createPost: createPost,
  updatePost: updatePost,
  deletePost: deletePost,
};
