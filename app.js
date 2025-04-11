const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
require('dotenv').config();

const db = require('./models');
db.sequelize.sync();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/uploads', express.static('uploads'));

const fileRoutes = require('./Routes/file.routes');
const blockRoutes = require('./Routes/block.routes');

app.use('/api/files', fileRoutes);
app.use('/api/blocks', blockRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
