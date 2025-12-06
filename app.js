require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const cors = require("cors");
const logger = require("./config/logger");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const catwaysRoutes = require('./routes/catwaysRoutes');

const app = express();

// Sécurité
app.use(cors());
app.use(logger);

// Middlewares globaux
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion DB
connectDB();
mongoose
  .connect(process.env.MONGO_URI, { dbName: "Api_russel" })
  .then(() => console.log("✓ MongoDB connecté"))
  .catch((err) => {
    console.error("Erreur MongoDB :", err);
    process.exit(1);
  });

// Routes API
app.use("/users", userRoutes);
app.use("/catways", catwaysRoutes);
app.use("/catways", reservationRoutes); // sous-routes catways/:id/reservations

// FRONTEND STATIQUE
app.use(express.static(path.join(__dirname, "public")));

// Pour SPA / pages HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Gestion centrale erreurs
app.use(errorHandler);

// Lancer serveur
app.listen(process.env.PORT, () =>
    console.log(`🚀 Serveur lancé sur http://localhost:${process.env.PORT}`)
);

// on exporte l'application qui sera utlisée par le fichier www qui démarre le serveur
module.exports = app;
