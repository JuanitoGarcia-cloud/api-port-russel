const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catway.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', auth, catwayController.listCatways);
router.get('/:id', auth, catwayController.getCatway);
router.post('/', auth, catwayController.createCatway);
router.put('/:id', auth, catwayController.updateCatway);
router.delete('/:id', auth, catwayController.deleteCatway);

module.exports = router;
