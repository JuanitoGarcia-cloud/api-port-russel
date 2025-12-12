const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/dashboard', (req, res) => {
  // dashboard view - in a real app, protect with auth middleware and fetch user data
  res.render('dashboard', { user: null });
});

module.exports = router;
