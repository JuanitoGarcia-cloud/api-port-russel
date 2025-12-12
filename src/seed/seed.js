const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Catway = require('../models/Catway');
const Reservation = require('../models/Reservation');
const User = require('../models/User');

const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected for seeding');

  const catwaysPath = path.join(__dirname, '..', '..', 'catways.json');
  const reservationsPath = path.join(__dirname, '..', '..', 'reservations.json');
  const usersPath = path.join(__dirname, '..', '..', 'users.json');

  if (fs.existsSync(catwaysPath)) {
    const catways = JSON.parse(fs.readFileSync(catwaysPath));
    for (const c of catways) {
      await Catway.updateOne({ catwayNumber: c.catwayNumber }, { $set: c }, { upsert: true });
    }
    console.log('Catways seeded');
  } else console.log('catways.json not found');

  if (fs.existsSync(reservationsPath)) {
    const reservations = JSON.parse(fs.readFileSync(reservationsPath));
    for (const r of reservations) {
      await Reservation.updateOne({ _id: r._id }, { $set: r }, { upsert: true });
    }
    console.log('Reservations seeded');
  } else console.log('reservations.json not found');

  if (fs.existsSync(usersPath)) {
    const users = JSON.parse(fs.readFileSync(usersPath));
    for (const u of users) {
      await User.updateOne({ _id: u._id }, { $set: u }, { upsert: true });
    }
    console.log('Users seeded');
  } else console.log('users.json not found');

  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
