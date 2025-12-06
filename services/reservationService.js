const Reservation = require('../models/reservationModel');
const ApiError = require("../middlewares/apiError");

// Ici c'est le callback qui servira à créer une réservation
exports.createReservation = (catwayNumber, data) => {
  const reservation = new Reservation({ ...data, catwayNumber });
  return reservation.save();
};

// Ici c'est le callback qui servira à récupérer tous les réservations
exports.getAllForCatway = (catwayNumber) => {
  return Reservation.find(catwayNumber);
};

// Ici c'est le callback qui servira à récupérer une réservation avec son id
exports.getReservationById = (catwayNumber) => {
  return Reservation.findById(catwayNumber, _id);
};

// Ici c'est le callback qui servira à modifier une réservation
exports.updateReservation = async (catwayNumber, _id, data) => {
  const resa = await Reservation.findOneAndUpdate({ catwayNumber, _id }, data, { new: true });
  if ('createdAt' in data) {
    delete data.createdAt;
  };
  if (!resa) throw new ApiError(404, "Utilisateur introuvable");
  return resa;
};

// Ici c'est le callback qui servira à supprimer une réservation
exports.deleteReservation = async (catwayNumber, _id) => {
  const deleting = await Reservation.findOneAndDelete({ catwayNumber, _id });
  if (!deleting) throw new ApiError(404, "Utilisateur introuvable");
  return deleting;
};