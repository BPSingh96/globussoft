const mongoose = require("mongoose");
const {makeToken} = require("../../helpers/createtoken");
const User = require("../models/users");
const bcrypt = require("bcrypt");
/**
* register user and return token 
* @param req
* @param res
* @param next
* @property {string} req.body.name  - user name
* @property {string} req.body.email  - user email
* @returns {data,message,status}
*/
const user_register_controller = (req, res, next)=>{
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user) {
                return res.status(200).json({
                    response: true,
                    message: "email registered allready",
                    status: false
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        });
                    }
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        name: req.body.name,
                        password: hash
                    });
                    user
                        .save()
                        .then(result => {
                            delete result.password;
                            return res.status(200).json({
                                response: true,
                                status: true,
                                data: {
                                    token: makeToken(result._id),
                                    user: result
                                },
                                message: "register successful",

                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(200).json({
                                response: true,
                                message: err,
                                status: false
                            });
                        });
                });
            }

        });
};

const user_login_controller = (req, res, next)=>{
    let query = { email: req.body.email };
    User.findOne(query,{devices: 0,})
        .exec()
        .then(user => {
            if (!user) {
                return res.status(200).json({
                    response: true,
                    message: "Invalid credential",
                    status: false
                });
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        return res.status(200).json({
                            response: true,
                            status: false,
                            message: "Auth failed"
                        });
                    } else if (result) {
                        if(user._doc.password) delete user._doc["password"];
                        return res.status(200).json({
                            response: true,
                            status: true,
                            data: {
                                user: user._doc,
                                token: makeToken(user._id)
                            },
                            message: "Auth successful",

                        });
                    } else {
                        return res.status(200).json({
                            response: true,
                            status: false,
                            message: "Auth failed"
                        });
                    }
                });
            }
        });
};

module.exports = {user_register_controller,user_login_controller};