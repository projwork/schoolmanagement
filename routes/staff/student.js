const express = require("express");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const {
  adminRegisterStudent,
  loginStudent,
  getStudentProfile,
  getAllStudentsByAdmin,
  getStudentByAdmin,
  studentUpdateProfile,
  adminUpdateStudent,
} = require("../../controller/students/studentsCtrl");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");

const studentRouter = express.Router();

studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get("/profile", isStudentLogin, isStudent, getStudentProfile);
studentRouter.get("/admin", isLogin, isAdmin, getAllStudentsByAdmin);
studentRouter.get("/:studentID/admin", isLogin, isAdmin, getStudentByAdmin);
studentRouter.put("/", isStudentLogin, isStudent, studentUpdateProfile);
studentRouter.put("/:studentID/admin", isLogin, isAdmin, adminUpdateStudent);

module.exports = studentRouter;
