const express = require("express");
const morgan = require("morgan");
const adminRouter = require("../routes/staff/adminRouter");
const {
  globalErrHandler,
  notFoundErr,
} = require("../middlewares/globalErrHandler");
const academicYearRouter = require("../routes/academics/academicYear");
const academicTermRouter = require("../routes/academics/academicTerm");
const classLevelRouter = require("../routes/academics/classLevel");
const programRouter = require("../routes/academics/program");
notFoundErr;
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());

//routes
// admin
app.use("/api/v1/admins", adminRouter);
//academic years
app.use("/api/v1/academic-years", academicYearRouter);
//academic terms
app.use("/api/v1/academic-terms", academicTermRouter);
//class levels
app.use("/api/v1/class-levels", classLevelRouter);
//programs
app.use("/api/v1/programs", programRouter);

//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;
