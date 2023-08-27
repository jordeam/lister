//index.js

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const supergroupRouter = require("./routes/supergroup");
const groupRouter = require("./routes/group");
const componentRouter = require("./routes/component");
const locationRouter = require("./routes/location");
const locationEntryRouter = require("./routes/locationentry");
const shoplistRouter = require("./routes/shoplist");
const supplierRouter = require("./routes/supplier");
const suppliercodeRouter = require("./routes/suppliercode");
const caseRouter = require("./routes/case");
const searchRouter = require("./routes/search");
const scriptRouter = require('./routes/scripts');
const imageRouter = require('./routes/images');

const compression = require("compression");
// const helmet = require("helmet");

const app = express();

// app.configure('development', function(){
//   app.use(express.errorHandler());
//   app.locals.pretty = true;
// });

app.set('view options', { pretty: true });

app.set('trust proxy', 1);
app.get('/ip', (request, response) => response.send(request.ip));

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 10 * 1000, // 10 seconds
  max: 30,
});
// Apply rate limiter to all requests
app.use(limiter);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use( // Firefox sucks, does not get 'self'
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: ["'self'"],
//             scriptSrc: ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
//         },
//     })
// );

app.use(compression()); // Compress all routes

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/supergroup", supergroupRouter);
app.use("/supplier", supplierRouter);
app.use("/suppliercode", suppliercodeRouter);
app.use("/location", locationRouter);
app.use("/locationentry", locationEntryRouter);
app.use("/shoplist", shoplistRouter);
app.use("/group", groupRouter);
app.use("/case", caseRouter);
app.use("/component", componentRouter);
app.use("/search", searchRouter);
app.use("/script", scriptRouter);
app.use("/image", imageRouter);

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


