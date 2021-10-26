const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const { showBody } = require('./utils/middleware');

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

// middleware
app.use(morgan('common'));
app.use(cors());
app.use(express.json());
app.use(showBody);

// static directory for css, img, js front files
const staticPath = path.join(__dirname, 'assets');
// console.log('staticPath', staticPath);
app.use(express.static(staticPath));


// Routes import
const accountsRoutes = require('./routes/v1/accountsRoutes');
const billsRoutes = require('./routes/v1/bills');

// Use routes
app.use('/accounts', accountsRoutes);
app.use('/bills', billsRoutes);

// 404 not found url
app.all('*', (req, res) => {
  res.status(404).send('Oops page not found :(');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
