const jsonwebtoken = require("jsonwebtoken");

const generateJWT = (userData) => {
    let JWT = jsonwebtoken.sign(
        userData,
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return JWT;
};

module.exports = { generateJWT };