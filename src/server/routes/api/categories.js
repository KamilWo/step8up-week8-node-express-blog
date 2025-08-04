const router = require('express').Router();
const { Category } = require('../../models');

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
