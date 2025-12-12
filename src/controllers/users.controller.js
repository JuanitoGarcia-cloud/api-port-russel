const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  if (password.length < 8) return res.status(400).json({ error: 'Password too short' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: 'Email already used' });
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hash });
  await user.save();
  res.status(201).json({ message: 'User created', user: { email: user.email, username: user.username } });
};

exports.listUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

exports.getUser = async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email }).select('-password');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const { email } = req.params;
  const updates = req.body;
  if (updates.password) updates.password = await bcrypt.hash(updates.password, 10);
  const user = await User.findOneAndUpdate({ email }, updates, { new: true }).select('-password');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  const { email } = req.params;
  const user = await User.findOneAndDelete({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ message: 'User deleted' });
};
