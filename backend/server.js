const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const strategyRoutes = require('./routes/strategies');
app.use('/api/strategies', strategyRoutes);

app.get('/', (req, res) => {
  res.send('Strategy Lab Backend is running');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
