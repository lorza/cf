const User = require("../models/User");

module.exports = function(express) {
  const router = express.Router();

  router.get("/registered_players", (req, res) => {
    User.find({}, (err, users) => {
      res.json({
        count: users.length
      })
    })
  })

  return router;
}
