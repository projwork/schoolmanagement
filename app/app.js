const express = require("express");
const morgan = require("morgan");
const adminRouter = require("../routes/staff/adminRouter");
const {
  globalErrHandler,
  notFoundErr,
} = require("../middlewares/globalErrHandler");
const academicYearRouter = require("../routes/academics/academicYear");
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

//Error middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;
