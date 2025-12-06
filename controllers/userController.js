const userService = require("../services/userService");
const generateToken = require("../middlewares/generateToken");

exports.createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        res.json(await userService.getAllUsers());
    } catch (err) {
        next(err);
    }
};

exports.getUserById = async (req, res, next) => {    
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user)
            return res.status(404).json({ message: "Utilisateur introuvable" });
        res.json(user);
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => { 
    try {
        res.json(await userService.patchUser(req.params.id, req.body));        
    } catch (err) {
       next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    const user = await userService.deleteUser(req.params.id);
    try {
        res.json(await userService.remove(req.params.email));       
    } catch (err) {
        next(err);
    }    
};

exports.login = async (req, res, next) => {
    try {
        const user = await userService.login(req.body.email, req.body.password);
        const token = generateToken(user);
        res.json({ message: "Connecté", token });
    } catch (err) {
        next(err);
    }
};

exports.logout = (req, res) => {
    res.json({ message: "Déconnecté (coté client: supprimer token localStorage)" });
};
