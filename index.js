var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res) => {
  res.status(200).json({
    name    : process.env.APP_NAME,
    version : '1.0',
    status  : 200,
    message : 'Bienvenue sur API Port Russel'
  });
});

router.use('/users', userRoutes);

module.exports = router;