const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const nunjucks = require("nunjucks");
const boardRouter = require("./src/board/boardRouter");
const authRouter = require("./src/auth/authRouter");

// mariadb
// const connection = require("./src/database/connection");
// sequelize
// const board = require("./src/model/boardModel");

// * passport
const passport = require("passport");
const passportConfig = require("./src/passport/passportConfig");
passportConfig();
/*
(async () => {
  console.log("board 테이블조회");
  // await board.create({
  //   title: "헬로우2",
  //   content: "내용임니당2",
  // });
  // await board.create({
  //   title: "헬로우3",
  //   content: "내용임니당3",
  // });
  // await board.update(
  //   {
  //     title: "헬로우 수정",
  //   },
  //   {
  //     where: { seq: 1 },
  //   }
  // );
  const result = await board.findAll();
  console.log("이겅");
  result.forEach((board) => {
    console.dir(board.dataValues);
  });
  // console.dir(result[0].dataValues);
})();
*/

dotenv.config();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionMiddleware = session({
  saveUninitialized: true,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
});

app.use(morgan("dev"));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.authenticate("session"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Login
app.get("/", (req, res) => {
  res.render("login", { isLogin: req.isAuthenticated() });
});

// app.post("/login", async (req, res) => {
//   let sql = `select * from user where id='${req.body.userId}' and password='${req.body.userPw}'`;
//   const user = (await connection(sql))[0];
//   req.session.userId = user.id;
//   console.log(req.session.userId);
//   res.redirect("/board");
//   // res.render("board");
// });

// * Router * //
app.use("/board", boardRouter);
app.use("/auth", authRouter);

// * 404 Router
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});
// * Error Router
app.use((err, req, res, next) => {
  res.locals.user = req.user;
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "prod" ? err : {};
  res.locals.error = err;
  res.render("error", { title: "Error Page" });
});

app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`);
  console.log("서버 실행");
});
