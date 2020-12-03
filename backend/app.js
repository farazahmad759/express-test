const jwt = require("jsonwebtoken");
var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var { authMiddleware } = require("./middlewares/auth.middlewares");
var authRouter = require("./routes/auth.routes");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users.routes");

// client
var qbClientPrintablesRouter = require("./routes/client-qb-printables.routes");

// superadmin
var qbSuperadminBoardyearsRouter = require("./routes/superadmin-qb-boardyears.routes");
var qbSuperadminGradesRouter = require("./routes/superadmin-qb-grades.routes");
var qbSuperadminPrintablesRouter = require("./routes/superadmin-qb-printables.routes");
var qbSuperadminQuestionsRouter = require("./routes/superadmin-qb-questions.routes");
var qbSuperadminQuestiontypesRouter = require("./routes/superadmin-qb-questiontypes.routes");
var qbSuperadminSubjectsRouter = require("./routes/superadmin-qb-subjects.routes");
var qbSuperadminSyllabusesRouter = require("./routes/superadmin-qb-syllabuses.routes");
var qbSuperadminTagsRouter = require("./routes/superadmin-qb-tags.routes");
var qbSuperadminTopicsRouter = require("./routes/superadmin-qb-topics.routes");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors()); //
app.use("/", indexRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);

// client
app.use("/api/v1/client/printables", qbClientPrintablesRouter);

// superadmin
app.use("/api/v1/superadmin/boardyears", qbSuperadminBoardyearsRouter);
app.use("/api/v1/superadmin/grades", qbSuperadminGradesRouter);
app.use("/api/v1/superadmin/printables", qbSuperadminPrintablesRouter);
app.use("/api/v1/superadmin/questions", qbSuperadminQuestionsRouter);
app.use("/api/v1/superadmin/questiontypes", qbSuperadminQuestiontypesRouter);
app.use("/api/v1/superadmin/subjects", qbSuperadminSubjectsRouter);
app.use("/api/v1/superadmin/syllabuses", qbSuperadminSyllabusesRouter);
app.use("/api/v1/superadmin/tags", qbSuperadminTagsRouter);
app.use("/api/v1/superadmin/topics", qbSuperadminTopicsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
