const router = express.Router();
const userController = require('../controllers/userController');
const private = require('../middlewares/private');
const validate = require('../middlewares/validate');
const { createUserSchema, updateUserSchema } = require('../validators/userValidator');
const auth = require('../middlewares/auth');

// La route pour créer un utilisateur
router.post('/', private.checkJWT, validate(createUserSchema), userController.createUser);
// La route pour lire les infos de tous les utilisateurs
router.get('/', private.checkJWT, auth, userController.getAllUsers);
// La route pour lire les infos d'un utilisateur
router.get('/:email', private.checkJWT, auth, userController.getUserById);
// La route pour modifier un utilisateur
router.put('/:email', private.checkJWT, auth, validate(updateUserSchema), userController.updateUser);
// La route pour supprimer un utilisateur
router.delete('/:email', private.checkJWT, auth, userController.deleteUser);

// La route pour la connection
router.post('/login', private.checkJWT, userController.connect);
// La route pour la déconnection
router.get('/logout', private.checkJWT, userController.disconnect);

module.exports = router;