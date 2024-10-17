const express = require("express");
const router = express.Router();

let {registerUser ,loginUser} =  require("../controllers/authController")

router.get("/", (req, res) => {
  res.render("index");
});
router.post("/register", registerUser);
router.post("/login", loginUser);
// router.post("/logout", logoutUser);

module.exports = router;
