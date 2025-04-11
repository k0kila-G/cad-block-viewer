const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');
const { body } = require('express-validator');

// POST /api/files/upload
router.post(
  '/upload',
  [
    body('file').custom((value, { req }) => {
      if (!req.files || !req.files.file) {
        throw new Error('No DXF file uploaded');
      }
      const file = req.files.file;
      if (!file.name.endsWith('.dxf')) {
        throw new Error('Only .dxf files are allowed');
      }
      return true;
    }),
  ],
  fileController.uploadDXF
);

module.exports = router;
