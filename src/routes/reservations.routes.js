const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');
const auth = require('../middleware/auth.middleware');

router.get('/:id/reservations', auth, reservationController.listReservationsForCatway);
router.get('/:id/reservations/:idReservation', auth, reservationController.getReservation);
router.post('/:id/reservations', auth, reservationController.createReservation);
router.put('/:id/reservations/:idReservation', auth, reservationController.updateReservation);
router.delete('/:id/reservations/:idReservation', auth, reservationController.deleteReservation);

module.exports = router;
