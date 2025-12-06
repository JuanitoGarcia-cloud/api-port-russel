const reservationService = require("../services/reservationService");

exports.createReservation = async (req, res, next) => {
    try {
        const reserv = await reservationService.createReservation(req.body);
        res.status(201).json(reserv);
    } catch (err) {
        next(err);
    }
};

exports.getAllReservations = async (req, res, next) => {
    try {
        res.json(await reservationService.getAllreservations(req.params.id));
    } catch (err) {
        next(err);
    }
};

exports.getReservationById = async (req, res, next) => {    
    try {
        const reserv = await reservationService.getReservationById(req.params.id, req.params.idReservation);
        if (!reserv)
            return res.status(404).json({ message: "Réservation introuvable" });
        res.json(reserv);
    } catch (err) {
        next(err);
    }
};



exports.updateReservation = async (req, res, next) => {
    try {
        res.json(await reservationService.updateReservation(req.params.id, req.params.idReservation, req.body));
    } catch (err) {
        next(err);
    }
};

exports.deleteReservation = async (req, res, next) => {
    try {
        res.json(await reservationService.deleteReservation(req.params.id, req.params.idReservation));
    } catch (err) {
        next(err);
    }
    
};