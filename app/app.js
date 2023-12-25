const express = require("express");
const morgan = require("morgan");
const adminRouter = require("../routes/staff/adminRouter");

const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());

//routes

// admin register
app.use("/api/v1/admins", adminRouter);

module.exports = app;
