const Parser = require('dxf-parser');
const fs = require('fs');

exports.extractBlocksFromDXF = (filePath) => {
  const parser = new Parser();
  const dxfContent = fs.readFileSync(filePath, 'utf-8');
  const dxf = parser.parseSync(dxfContent);

  console.log('Parsed DXF:', JSON.stringify(dxf.blocks, null, 2)); // 👈 Log what's inside

  const blocks = [];

  for (const [name, block] of Object.entries(dxf.blocks || {})) {
    blocks.push({
      name,
      x: block.basePoint?.x || 0,
      y: block.basePoint?.y || 0,
      type: block.type || 'BLOCK',
    });
  }

  return blocks;
};
