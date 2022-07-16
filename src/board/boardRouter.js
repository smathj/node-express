const express = require("express");
const router = express.Router();
const loginCheck = require("../middleware/loginCheck");

router.get("/", loginCheck, (req, res) => {
  // console.log("--------------라우터 에서-----------------");
  // console.log("req.user 확인해봅시다");
  // console.log(req.user);
  // console.log("req.isAuthenticated 확인해봅시다");
  // console.log(req.isAuthenticated);
  // console.log("-------------------------------");

  res.render("board", { user: req.user });
});

module.exports = router;
