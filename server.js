const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

web={
  title: 'Garuda Information Management System' ,
  judul: ''
};

const pool = require('./helpers/database'); // Assuming `database.js` is in the same directory
// Middleware untuk mengatur base_url secara otomatis
app.use((req, res, next) => {
  const base_url = `${req.protocol}://${req.get('host')}`;
  //req.base_url = base_url;
  app.locals.base_url = base_url;
  next();
});
// Configure EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Assuming 'views' folder is in the root directory

// Configure the static folder for serving static files
app.use(express.static('public'));


// Import router agama
const agamaRouter = require('./routes/master/agama');
const bahasaRouter = require('./routes/master/bahasa');
const hariRouter = require('./routes/master/hari');
const jenisPembayaranRouter = require('./routes/master/jenis_pembayaran');
// Gunakan router agama
app.use('/master/agama', agamaRouter);
app.use('/master/bahasa', bahasaRouter);
app.use('/master/hari',hariRouter );
app.use('/master/jenis_pembayaran',jenisPembayaranRouter );


// Define your routes
app.get('/', (req, res) => {
  res.render('sign-in',{web});
});

// Define your routes
app.get('/main', (req, res) => {
    res.render('layout/main', { pages: '../home',web});
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
