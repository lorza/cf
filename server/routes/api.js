const User = require("../models/User");
const bcrypt = require("bcrypt");

// UTILS
const SALT = 8;
const log = (m) => {
  console.log(m);
}

const handleErr = function(err) {
  log("Oops there was an error: \n "+ err);
  throw err;
}
// ===============

module.exports = function(express, jwt, config) {
  const router = express.Router();

  router.get("/", (req, res) => {
    User.find({}, (err, users) => {
      log(users);
      res.json(users);
    })
  });

  router.post("/register", (req, res) => {
    bcrypt.genSalt(SALT, (err, salt) => {
      err ? handleErr(err) : null;
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        err ? handleErr(err) : null;

        let newUser = new User({
          username: req.body.username,
          password: hash,
        })

        newUser.save((err) => {
          err ? handleErr(err) : null;
          log("\n User Created Successfully" + newUser);

          res.json({
            success: true,
            message: "User Created Successfully",
            user: newUser,
          })
        })
      })
    })
  });

  router.post("/reg", (req, res) => {
    // check if user exists
    User.findOne({username: req.body.username}, (err, user) => {
      if (user) {
        res.json({
          success: false,
          message: "User Already Exists"
        })
        return;
      }

      let newUser = new User({
        username: req.body.username
      })

      newUser.save((err) => {
        err ? handleErr(err) : null;
        log("\nUser created successfully \n" + newUser);
      })

      console.log("NEW USER: ", newUser);

      const payload = {
        user: newUser,
      };

      if (payload.user.password == "") {
        payload.user.password = false;
      }

      const token = jwt.sign(payload, config.secret, {
        expiresIn: 43200
      })

      res.json({
        success: true,
        message: "User created",
        token: token,
        user: newUser
      });
    })
  });

  router.post("/usercheck", (req, res) => {
    console.log(req.body);
    User.findOne({username: req.body.username}, (err, user) => {
      if(!user) {
        res.json({match: false})
      } else {
        res.json({match: true});
      }
    })
  })

  router.post("/auth", (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
      if(!user) {
        res.json({
          success: false,
          message: "Authorization Failed. User not found",
          ip: req.connection.removeAddress,
        })
      }
      if(user) {
        if (req.body.password === "") {

          user.password = false;

          const payload = {
            user: user
          };

          const token = jwt.sign(payload, config.secret, {
            expiresIn: 43200,
          })

          res.json({
            success: true,
            match: true,
            token: token,
            user: user,
            ip: req.connection.removeAddress,
          })

          return;
        }

        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if(result == true) {

            user.password = true;

            const payload = {
              user: user
            };

            const token = jwt.sign(payload, config.secret, {
              expiresIn: 43200,
            })

            res.json({
              success: true,
              match: true,
              res: result,
              token: token,
              ip: req.connection.removeAddress,
            })


          } else {
            res.json({
              success: false,
              match: false,
              res: result,
              ip: req.connection.removeAddress,
            })
          }
        })
      }
    })
  });

  router.get("/verify", (req, res) => {
    // console.log(req.headers);
    // console.log("JWT?: ", req.headers.authorization);
  });
  
  return router;
}
