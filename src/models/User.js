const mongoose = require('mongoose');

/**
 * User model
 * @typedef User
 * @property {string} username
 * @property {string} email
 * @property {string} password - hashed
 */
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
