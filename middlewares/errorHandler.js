module.exports = (err, req, res, next) => {
    console.error("❌ ERREUR :", err);

    res.status(err.status || 500).json({
        status: "error",
        message: err.message || "Erreur interne serveur"
    });
};