const mongoose = require("mongoose");

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🟢 MongoDB connecté");
    } catch (err) {
        console.error("🔴 Erreur connexion MongoDB :", err);
    }
};