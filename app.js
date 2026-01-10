const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const patientRoutes = require('./routes/patientRoutes');
const db = require('./models'); // sequelize

const app = express(); // ✅ PHẢI KHAI BÁO TRƯỚC

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', patientRoutes);

// database
db.sequelize.sync().then(() => {
  console.log('✅ Database connected');
});

// start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
