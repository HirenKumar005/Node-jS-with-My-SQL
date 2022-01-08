const jwt = require('jsonwebtoken');

const generateToken = (req, res, next) => {
    let token = jwt.sign({ email: req.body.email }, 'jwtPrivateKey');
    res.cookie('jwt', token);
    next();
};
const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token == undefined) {
            res.status(400).send('please Enter The Token');
        }
        const verifyUser = jwt.verify(token, 'jwtPrivateKey');
        req.user = verifyUser;
        next();
    }
    catch (error) {
        console.error(error);
    }
}
module.exports = {
    generateToken, authenticate
}