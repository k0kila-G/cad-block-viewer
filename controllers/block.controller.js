const { Block } = require('../models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

exports.getBlocks = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;

    const blocks = await Block.findAndCountAll({
      where: {
        name: { [Op.iLike]: `%${search}%` },
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.json({
      total: blocks.count,
      pages: Math.ceil(blocks.count / limit),
      data: blocks.rows, // ✅ Must match frontend's expected key
    });
    
    
  }  catch (error) {
    console.error('Error in getBlocks:', error); // 🔍 SHOW error
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getBlockById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const block = await Block.findByPk(req.params.id);
    if (!block) return res.status(404).json({ message: 'Block not found' });
    res.json(block);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching block' });
  }
};
