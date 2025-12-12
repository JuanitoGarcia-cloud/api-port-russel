const Catway = require('../models/Catway');

exports.createCatway = async (req, res) => {
  const { catwayNumber, catwayType, catwayState } = req.body;
  if (!catwayNumber || !catwayType) return res.status(400).json({ error: 'Missing fields' });
  const exists = await Catway.findOne({ catwayNumber });
  if (exists) return res.status(400).json({ error: 'Catway number already exists' });
  const catway = new Catway({ catwayNumber, catwayType, catwayState });
  await catway.save();
  res.status(201).json(catway);
};

exports.listCatways = async (req, res) => {
  const catways = await Catway.find().sort('catwayNumber');
  res.json(catways);
};

exports.getCatway = async (req, res) => {
  const id = Number(req.params.id);
  const catway = await Catway.findOne({ catwayNumber: id });
  if (!catway) return res.status(404).json({ error: 'Catway not found' });
  res.json(catway);
};

exports.updateCatway = async (req, res) => {
  const id = Number(req.params.id);
  const { catwayState } = req.body;
  const catway = await Catway.findOneAndUpdate({ catwayNumber: id }, { catwayState }, { new: true });
  if (!catway) return res.status(404).json({ error: 'Catway not found' });
  res.json(catway);
};

exports.deleteCatway = async (req, res) => {
  const id = Number(req.params.id);
  const catway = await Catway.findOneAndDelete({ catwayNumber: id });
  if (!catway) return res.status(404).json({ error: 'Catway not found' });
  res.json({ message: 'Catway deleted' });
};
