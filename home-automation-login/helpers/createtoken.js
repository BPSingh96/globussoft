const jwt = require("jsonwebtoken");
const config = require("../config.json");
const makeToken = (admin_id)=>{
    return token = jwt.sign({admin_id: admin_id},
        process.env.JWT_KEY || config.JWT_KEY,
        {
            expiresIn: "1d"
        }
    );
};
const getAdminId = (req)=>{
    let token, decoded;
    try {
        token = req.headers.authorization.split(" ")[1];
        decoded = jwt.verify(token, process.env.JWT_KEY || config.JWT_KEY);
        return decoded['admin_id']
    } catch{
        return false
    }
};

module.exports = {makeToken, getAdminId};