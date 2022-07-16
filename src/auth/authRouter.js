const express = require("express");
const router = express.Router();
const passport = require("passport");
const loginCheck = require("../middleware/loginCheck");

router.post("/login", (req, res, next) => {
  // console.log("--------- 로그인 프로세스 시작 ---------");
  passport.authenticate(
    "local",
    // { failureRedirect: "/", successRedirect: "/" ,},
    (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        return res.send("로그인 실패");
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        // console.log("------- 로그인 프로세스 종료 --------");
        // console.log("/board로 리다이렉트 진행");
        // console.log("----------------------------------");
        return res.redirect("/board");
      });
    }
  )(req, res, next);
});

router.get("/check", loginCheck, (req, res) => {
  return res.send("ok");
});

router.get("/logout", loginCheck, (req, res) => {
  return req.logout((err) => {
    req.session.destroy();
    res.redirect("/");
  });
});

module.exports = router;
