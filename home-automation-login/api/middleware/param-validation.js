const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);


	/**
	 * validate user registation info, and return a next to handle the request in next step
	 * @param req
	 * @param res
	 * @param next
	 * @property {string} req.body
	 * @returns {next}
	 */
	registerUserValidation =(req, res, next)  =>{
		let registerUserValidation = Joi.object().keys({
            name: Joi.string().trim().required(),
            password: Joi.string().trim().required(),
            email: Joi.string().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).email().required()
    
		});
		const { error } = registerUserValidation.validate(req.body, {
			abortEarly: false,
		});
		if (!error) {
			next();
		} else {
            const errorMessages = error.details.map((detail) => detail.message);
            const err = new Error(errorMessages);
            err.status = 401;
			next(err);
		}
	};

/**
	 * validate user login info, and return a next to handle the request in next step
	 * @param req
	 * @param res
	 * @param next
	 * @property {string} req.body
	 * @returns {next}
	 */
	userLoginValidation =(req, res, next)  =>{
		let userLoginValidation = Joi.object().keys({
            password: Joi.string().trim().required(),
            email: Joi.string().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).email().required()
    
		});
		const { error } = userLoginValidation.validate(req.body, {
			abortEarly: false,
		});
		if (!error) {
			next();
		} else {
            const errorMessages = error.details.map((detail) => detail.message);
            const err = new Error(errorMessages);
            err.status = 401;
			next(err);
		}
	};

    /**
	 * validate add device info, and return a next to handle the request in next step
	 * @param req
	 * @param res
	 * @param next
	 * @property {string} req.body
	 * @returns {next}
	 */
	deviceValidation =(req, res, next)  =>{
		let deviceValidation = Joi.object().keys({
            name: Joi.string().trim().required(),    
		});
		const { error } = deviceValidation.validate(req.body, {
			abortEarly: false,
		});
		if (!error) {
			next();
		} else {
            const errorMessages = error.details.map((detail) => detail.message);
            const err = new Error(errorMessages);
            err.status = 401;
			next(err);
		}
	};

    /**
	 * validate remove device info, and return a next to handle the request in next step
	 * @param req
	 * @param res
	 * @param next
	 * @property {string} req.body
	 * @returns {next}
	 */
	removeDeviceValidation =(req, res, next)  =>{
		let removeDeviceValidation = Joi.object().keys({
            deviceId: Joi.objectId().required()   
		});
		const { error } = removeDeviceValidation.validate(req.params, {
			abortEarly: false,
		});
		if (!error) {
			next();
		} else {
            const errorMessages = error.details.map((detail) => detail.message);
            const err = new Error(errorMessages);
            err.status = 401;
			next(err);
		}
	};




module.exports = {removeDeviceValidation, deviceValidation, userLoginValidation, registerUserValidation }