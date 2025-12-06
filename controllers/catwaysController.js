const catwayService = require("../services/catwaysService");

exports.createCatways = async (req, res, next) => {
    try {
        res.status(201).json(await catwayService.createCatways(req.body));
    } catch (err) {
        next(err);
    }
};

exports.getAllCatways = async (req, res, next) => {
    try {
        res.json(await catwayService.getAllCatways());
    } catch (err) {
        next(err);
    }
};

exports.getCatwaysById = async (req, res, next) => {    
    try {
        const catw = await catwayService.getCatwaysById(req.params.id);
        if (!catw) return res.status(404).json({ message: "catway introuvable" });
        res.json(catw);
    } catch (err) {
        next(err);
    }
};

exports.updateCatways = async (req, res, next) => {
    try {
        res.json(await catwayService.patchCatways(req.params.id, req.body));
    } catch (err) {
        next(err);
    }
};

exports.deleteCatways = async (req, res, next) => {  
    try {
        res.json(await catwayService.deleteCatways(req.params.id));       
    } catch (err) {
        next(err);
    }    
};
