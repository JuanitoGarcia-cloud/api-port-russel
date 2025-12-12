const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const auth = require('../middleware/auth.middleware');

router.post('/', usersController.createUser);
router.get('/', auth, usersController.listUsers);
router.get('/:email', auth, usersController.getUser);
router.put('/:email', auth, usersController.updateUser);
router.delete('/:email', auth, usersController.deleteUser);

module.exports = router;
