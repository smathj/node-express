const passport = require("passport");
const local = require("./localStrategy");

module.exports = () => {
  passport.serializeUser((user, done) => {
    // console.log("-------- 시리얼 라이즈 --------");
    // console.log("passport.serializeUser");
    // console.log(user);
    // console.log("-----------------------------");
    done(null, user.id); // req.login 콜백 호출
  });

  passport.deserializeUser((id, done) => {
    // req.user로 부터 id를 가져온건데 이걸로 사용자 확인
    // console.log("-------- 디시리얼 라이즈 --------");
    // console.log("passport.deserializeUser");
    // console.log(id);
    // console.log("-----------------------------");
    done(null, { id });
  });

  // * 전략들 * //

  // 로컬 전략
  local();
};
