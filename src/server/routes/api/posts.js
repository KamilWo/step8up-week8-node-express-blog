// This file defines the API routes specifically for posts.

const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middleware/authMiddleware");
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../../controllers/postController");

// GET /api/posts - Get all posts, anyone can see them
router.get("/", getAllPosts);

// GET /api/posts/:id - Get a single post by ID
router.get("/:id", getPost);

// Protected routes - only logged-in users can create, update, or delete posts
// POST /api/posts - Create a new post
router.post("/", isAuthenticated, createPost);

// PUT /api/posts/:id - Update an existing post
router.put("/:id", isAuthenticated, updatePost);

// DELETE /api/posts/:id - Delete a post
router.delete("/:id", isAuthenticated, deletePost);

module.exports = router;
