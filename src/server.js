const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const { showBody } = require('./utils/middleware');
const { port } = require('./config');

const mysql = require('mysql2/promise');

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

// middleware
app.use(morgan('common'));
app.use(cors());
app.use(express.json());
app.use(showBody);

app.get('/', (req, res) => {
  res.send('Hello express');
});

// Routes import
const accountsRoutes = require('./routes/v1/accounts');

// Use routes
app.use('/accounts', accountsRoutes);

// 404 not found url
app.all('*', (req, res) => {
  res.status(404).send('Oops page not found :(');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
