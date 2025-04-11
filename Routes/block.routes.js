const express = require('express');
const router = express.Router();
const blockController = require('../controllers/block.controller');

router.get('/', blockController.getBlocks);
router.get('/:id', blockController.getBlockById);

module.exports = router;
