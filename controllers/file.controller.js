const path = require('path');
const fs = require('fs');
const { File, Block } = require('../models');
const { extractBlocksFromDXF } = require('../services/dxf.service');

exports.uploadDXF = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.files.file;
    console.log('File received:', file.name);

    const uploadPath = path.join(__dirname, '../uploads', file.name);
    await file.mv(uploadPath);

    const fileRecord = await File.create({ name: file.name });

    const blocks = extractBlocksFromDXF(uploadPath);
    for (const block of blocks) {
      await Block.create({ ...block, fileId: fileRecord.id });
    }

    res.status(201).json({ message: 'File uploaded and blocks extracted', blocks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while processing DXF' });
  }
};
