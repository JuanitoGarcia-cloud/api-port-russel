const jwt = require ('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

exports.checkJWT = async (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorisation'];
    if (!!token && token.startsWitch('Bearer')) {
        token = token.slice(7, token.length);
    }
    
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
           if (err) {
            res.status(401).json('token_pas_valide');
           } else {
            req.decoded = decoded;

            const expireIn = 24 * 60 * 60;
            const newToken = jwt.sign({
                user : decoded.user
            },
            SECRET_KEY,
            {
                expiresIn: expireIn
            });

            res.header('Authorisation', 'Bearer ' + newToken);
            next();
           }
        });
    } else {
        res.status(401).json('token_manquant');
    }
}