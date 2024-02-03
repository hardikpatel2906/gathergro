const jsonwebtoken = require("jsonwebtoken");

const generateJWT = (userData) => {
    let JWT = jsonwebtoken.sign(
        { _id: userData._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return JWT;
};

module.exports = { generateJWT };