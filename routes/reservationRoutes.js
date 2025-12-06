const router = express.Router();
const reservationController = require('../controllers/reservationController');
const private = require('../middlewares/private');
const validate = require("../middleware/validate");
const auth = require("../middleware/auth");
const { createReservationSchema, updateReservationSchema } = require("../validators/reservation.validator");

// La route pour créer un reservation
router.post('/:id/reservations', private.checkJWT, auth, validate(createReservationSchema), reservationController.createReservation);
// La route pour lire les infos de tous les reservations
router.get('/:id/reservations', private.checkJWT, auth, reservationController.getAllReservations);
// La route pour lire les infos d'un reservation
router.get('/:id/reservations/:idReservation', private.checkJWT, auth, reservationController.getReservationById);
// La route pour ajouter un reservation
router.put('/:id/reservations/:idReservation', private.checkJWT, auth, validate(updateReservationSchema), reservationController.updateReservation);
// La route pour supprimer un reservation
router.delete('/:id/reservations/:idReservation', private.checkJWT, auth, reservationController.deleteReservation);

module.exports = router;