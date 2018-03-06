const Joi = require("joi");

module.exports = {
    register(req, res, next) {
        const schema = {
            username: Joi.string(),
            password: Joi.string().regex(
                new RegExp("^[a-zA-Z0-9]{6, 32}$")
            )
        }

        const {error} = Joi.validate(req.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case "username":
                    res.status(400).send({
                        success: false, 
                        message: "You must provide valid email address",
                    }) 
                    break
                case "password":
                    res.status(400).send({
                        success: false, 
                        message: "Password must be alphanumeric and between 8-32 characters"
                    })
                    break;
                default:
                    res.status(400).send({
                        success: false, 
                        message: "Invalid registration information"
                    })
            }
        } else {
            next();
        }
    }
}