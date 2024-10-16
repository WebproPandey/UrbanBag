const express = require("express");
const router = express.Router();
let {registerUser} =  require("../controllers/authController")


router.get("/", (req, res) => {
  res.send("hey users");
});
router.post("/register", registerUser);

module.exports = router;
