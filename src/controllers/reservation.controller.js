const Reservation = require('../models/Reservation');
const Catway = require('../models/Catway');

function overlap(aStart, aEnd, bStart, bEnd) {
  return (aStart < bEnd) && (bStart < aEnd);
}

exports.listReservationsForCatway = async (req, res) => {
  const id = Number(req.params.id);
  const reservations = await Reservation.find({ catwayNumber: id }).sort('startDate');
  res.json(reservations);
};

exports.getReservation = async (req, res) => {
  const id = Number(req.params.id);
  const rid = req.params.idReservation;
  const reservation = await Reservation.findOne({ _id: rid, catwayNumber: id });
  if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
  res.json(reservation);
};

exports.createReservation = async (req, res) => {
  const id = Number(req.params.id);
  const { clientName, boatName, startDate, endDate } = req.body;
  if (!clientName || !boatName || !startDate || !endDate) return res.status(400).json({ error: 'Missing fields' });
  const catway = await Catway.findOne({ catwayNumber: id });
  if (!catway) return res.status(400).json({ error: 'Catway does not exist' });
  const s = new Date(startDate);
  const e = new Date(endDate);
  if (s >= e) return res.status(400).json({ error: 'startDate must be before endDate' });
  const existing = await Reservation.find({ catwayNumber: id });
  for (const r of existing) {
    if (overlap(s, e, new Date(r.startDate), new Date(r.endDate))) {
      return res.status(400).json({ error: 'Reservation overlaps existing reservation' });
    }
  }
  const reservation = new Reservation({ catwayNumber: id, clientName, boatName, startDate: s, endDate: e });
  await reservation.save();
  res.status(201).json(reservation);
};

exports.updateReservation = async (req, res) => {
  const id = Number(req.params.id);
  const rid = req.params.idReservation;
  const updates = req.body;
  if (updates.startDate && updates.endDate) {
    const s = new Date(updates.startDate);
    const e = new Date(updates.endDate);
    if (s >= e) return res.status(400).json({ error: 'startDate must be before endDate' });
    const existing = await Reservation.find({ catwayNumber: id, _id: { $ne: rid } });
    for (const r of existing) {
      if (overlap(s, e, new Date(r.startDate), new Date(r.endDate))) {
        return res.status(400).json({ error: 'Reservation overlaps existing reservation' });
      }
    }
  }
  const reservation = await Reservation.findOneAndUpdate({ _id: rid, catwayNumber: id }, updates, { new: true });
  if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
  res.json(reservation);
};

exports.deleteReservation = async (req, res) => {
  const id = Number(req.params.id);
  const rid = req.params.idReservation;
  const reservation = await Reservation.findOneAndDelete({ _id: rid, catwayNumber: id });
  if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
  res.json({ message: 'Reservation deleted' });
};
