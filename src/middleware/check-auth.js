const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(404).json('no auth header on the front side')
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, 'secretultimatespecialkey');
    } catch (e) {
        res.status(500);
        throw e
    }

    if (!decodedToken) {
        return res.status(401).json('unauthorized')
    }

    req.userId = decodedToken.userId;
    next();
}