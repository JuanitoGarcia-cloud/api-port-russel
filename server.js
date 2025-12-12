const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const db = require('./src/config/db');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/users.routes');
const catwayRoutes = require('./src/routes/catways.routes');
const reservationRoutes = require('./src/routes/reservations.routes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/docs/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect DB
db.connect();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', require('./src/routes/web.routes'));
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/catways', catwayRoutes);
app.use('/catways', reservationRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
