const express = require('express');
const router = express.Router();
const { query, param } = require('express-validator');
const blockController = require('../controllers/block.controller');

// GET /api/blocks
router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    query('search').optional().isString().withMessage('Search must be a string'),
  ],
  blockController.getBlocks
);

// GET /api/blocks/:id
router.get(
  '/:id',
  [param('id').isInt().withMessage('Block ID must be an integer')],
  blockController.getBlockById
);

module.exports = router;
