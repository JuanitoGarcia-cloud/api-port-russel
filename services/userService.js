const User = require('../models/userModel');
const ApiError = require("../middlewares/apiError");

// Ici c'est le callback qui servira à créer un user
exports.createUser = async (data) => {
  const exists = await User.findOne({ email: data.email });
  if (exists) throw new ApiError(400, "Email déjà utilisé");

  const user = new User(data);
  return user.save();
};

// Ici c'est le callback qui servira à récupérer tous les users
exports.getAllUsers = () => {
  return User.find();
};

// Ici c'est le callback qui servira à récupérer un user avec son id
exports.getUserById = (email) => {
  return User.findById(email);
};



// Ici c'est le callback qui servira à modifier un user
exports.updateUser = async (email, data) => {
  const user = await User.findOneAndUpdate({ email }, data, { new: true })
  if ('createdAt' in data) {
    delete data.createdAt;
  };
  if (!user) throw new ApiError(404, "Utilisateur introuvable");
  return user.findByIdAndUpdate(id, data, { new: true });
};

// Ici c'est le callback qui servira à supprimer un user
exports.deleteUser = async (email) => {
  const removed = await User.findOneAndDelete({ email });
  if (!removed) throw new ApiError(404, "Utilisateur introuvable");
  return removed;
};

// Ici c'est le callback qui servira à la connection
exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(400, "Identifiants invalides");

    const isValid = await user.comparePassword(password);
    if (!isValid) throw new ApiError(400, "Identifiants invalides");

    return user;
};