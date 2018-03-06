const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config.js");

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.secret, {
        expiresIn: ONE_WEEK,
    })
}

module.exports = {
    async register(req, res) {
        const user = await new User({
            username: req.body.username, 
            password: req.body.password,
        });

        user.save((err) => {
            if (err) {
                res.status(400).send({
                    success: false, 
                    message: "Username already taken",
                    err: err, 
                });
                return;
            }
            else {
                res.status(200).send({
                    success: true, 
                    message: "User successfully registered", 
                    user, 
                })
            }
        })
    },

    async login (req, res) {
        const {username, password} = req.body;

        console.log(username);
        console.log(password);
        
        User.findOne({
            username: username,
        }, function(err, user) {

            if (err) {
                return res.status(500).send({
                    success: false,
                    message: "An error has occured trying to log in",
                })
            }

            if (!user) {
                return res.status(403).send({
                   success: false, 
                   message: "Incorrect login information", 
                })
            }
            
            const isValid = user.comparePassword(password);
            if (isValid == false) {
                return res.status(403).send({
                    success: false, 
                    message: "Incorrect login information"
                })
            }

            res.status(200).send({
                user, 
                token: jwtSignUser({user}),
            })
        })
    }

    
}