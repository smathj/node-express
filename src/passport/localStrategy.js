const passport = require("passport");
const LocalStrategy = require("passport-local");
const query = require("../database/connection");

module.exports = () => {
  passport.use(
    // "local",
    new LocalStrategy(
      {
        usernameField: "id", // req.body.id
        passwordField: "password", // req.body.
      },
      async (id, password, done) => {
        // db 조회
        let sql = `select count(*) as count from user where id="${id}" and password="${password}"`;
        let count = await query(sql);
        count = parseInt(count[0].count);
        if (count === 1) {
          done(null, { id, password });
        } else {
          const error = new Error("아이디나 패스워드가 잘못되었습니다.");
          error.status = 400;
          done(error);
          // done(null, false, { message: "아이디나 패스워드가 잘못되었습니다." });
        }
      }
    )
  );
};
