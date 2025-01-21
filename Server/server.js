// filepath: server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api', eventRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});