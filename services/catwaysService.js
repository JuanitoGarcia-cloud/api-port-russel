const Catways = require('../models/catwaysModel');
const ApiError = require("../utils/ApiError");

// Ici c'est le callback qui servira à créer une catway
exports.createCatways = (data) => {
  const catways = new Catways(data);
  return catways.save();
};

// Ici c'est le callback qui servira à récupérer tous les catways
exports.getAllCatways = () => {
  return Catways.find();
};

// Ici c'est le callback qui servira à récupérer une catway avec son id
exports.getCatwaysById = (catwayNumber) => {
  return Catways.findById(catwayNumber);
};

// Ici c'est le callback qui servira à modifier une catway
exports.updateCatways = async (catwayNumber, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  };
  if (!Catways) throw new ApiError(404, "Catway introuvable");
  return Catways.findByIdAndUpdate(catwayNumber, data, { new: true });
};

// Ici c'est le callback qui servira à supprimer une catway
exports.deleteCatways = async (catwayNumber) => {
  const removed = await Catways.findOneAndDelete({ catwayNumber: num });
    if (!removed) throw new ApiError(404, "Catway introuvable");
    return removed;
};