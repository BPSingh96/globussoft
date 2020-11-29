const express = require("express");
const {add_new_devices,remove_devices,get_All_devices} =  require("../controlers/devices");
const {removeDeviceValidation, deviceValidation} = require("../middleware/param-validation");
const deviceRoutes = express.Router();
deviceRoutes.post("/add", deviceValidation, add_new_devices);
deviceRoutes.get("/", get_All_devices);
deviceRoutes.delete("/:deviceId", removeDeviceValidation, remove_devices);

module.exports = deviceRoutes;
