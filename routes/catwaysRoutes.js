const router = express.Router();
const catwaysController = require('../controllers/catwaysController');
const private = require('../middlewares/private');
const validate = require("../middleware/validate");
const auth = require("../middleware/auth");
const { createCatwaySchema, updateCatwaySchema } = require("../validators/catway.validator");

// La route pour créer un catway
router.post('/', private.checkJWT, auth, validate(createCatwaySchema), catwaysController.createCatways);
// La route pour lire les infos de tous les catways
router.get('/', private.checkJWT, auth, catwaysController.getAllCatways);
// La route pour lire les infos d'un catway
router.get('/:id', private.checkJWT, auth, catwaysController.getCatwaysById);
// La route pour modifier un catway
router.put('/:id', private.checkJWT, auth, validate(updateCatwaySchema), catwaysController.updateCatways);
// La route pour supprimer un catway
router.delete('/:id', private.checkJWT, auth, catwaysController.deleteCatways);

module.exports = router;