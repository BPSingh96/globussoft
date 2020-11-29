const mongoose = require("mongoose");
const {makeToken,getAdminId} = require("../../helpers/createtoken");
const User = require("../models/users");
/**
* get all device and return token 
* @param req
* @param res
* @param next
* @returns {data,message,status}
*/
const get_All_devices = (req, res, next)=>{
    let admin_id = getAdminId(req);
    if (admin_id) {
        User.findOne({adminId:admin_id})
        .then(userResult=>{
            if(!userResult){
                return res.status(200).json({
                    response: true,
                    message: "Invalid User",
                    status: false
                });
            }

            return res.status(200).json({
                response: true,
                status: true,
                data: {
                    devices: userResult.devices || [],
                    token: makeToken(user._id)
                },

            });
        }).catch(err=>{
            res.status(200).json({
                response: true,
                message: String(err),
                status: false
            });
        })
    }
    else {
        res.status(200).json({
            response: true,
            message: "Invalid User",
            status: false
        });
    }
    };
/**
* add new device and return token 
* @param req
* @param res
* @param next
* @property {string} req.body.name  - user name
* @returns {data,message,status}
*/
const add_new_devices = (req, res, next)=>{
    let admin_id = getAdminId(req);
    if (admin_id) {
        User.findOne({adminId:admin_id})
        .then(userResult=>{
            if(!userResult){
                return res.status(200).json({
                    response: true,
                    message: "Invalid User",
                    status: false
                });
            }
            const id = String(new mongoose.Types.ObjectId());
            User.updateOne({adminId:admin_id},{$push: {id: id, name: req.body.name}})
            .then(result=>{
                if(!result.nModified)
                    return res.status(200).json({
                        response: true,
                        message: "Something went wrong",
                        status: false
                    });
                res.status(200).json({
                    response: true,
                    status: true,
                    data: {
                        device: {id: id, name: req.body.name},
                        token: makeToken(user._id)
                    },
    
                });
            }).catch(err=>{
                res.status(200).json({
                    response: true,
                    message: String(err),
                    status: false
                });
            })
        })
    .catch(err=>{
            res.status(200).json({
                response: true,
                message: String(err),
                status: false
            });
        })
    }
    else {
        res.status(200).json({
            response: true,
            message: "Invalid User",
            status: false
        });
    }
    };

/**
* remove device and return token 
* @param req
* @param res
* @param next
* @property {string} req.params.deviceId  - user name
* @returns {data,message,status}
*/
const remove_devices = (req, res, next)=>{
    let admin_id = getAdminId(req);
    req.params.imageId
    if (admin_id) {
        User.findOne({adminId:admin_id, devices: {$elemMatch:{ id: req.params.deviceId}}})
        .then(userResult=>{
            if(!userResult){
                return res.status(200).json({
                    response: true,
                    message: "Invalid device",
                    status: false
                });
            }
            User.updateOne({adminId:admin_id},{$pull: {id: req.params.deviceId}})
            .then(result=>{
                if(!result.nModified)
                    return res.status(200).json({
                        response: true,
                        message: "Something went wrong",
                        status: false
                    });
                res.status(200).json({
                    response: true,
                    status: true,
                    data: {
                        token: makeToken(user._id)
                    },
                    message: "deleted"
    
                });
            }).catch(err=>{
                res.status(200).json({
                    response: true,
                    message: String(err),
                    status: false
                });
            })
        })
    .catch(err=>{
            res.status(200).json({
                response: true,
                message: String(err),
                status: false
            });
        })
    }
    else {
        res.status(200).json({
            response: true,
            message: "Invalid User",
            status: false
        });
    }
    };


    module.exports = {add_new_devices,remove_devices,get_All_devices};