const express = require("express");
const {} = require("../../controller/academics/academicYearCtrl");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const {
  createAcademicTerm,
  getAcademicTerms,
  getAcademicTerm,
  updateAcademicTerm,
  deleteAcademicTerm,
} = require("../../controller/academics/academicTermCtrl");

const academicTermRouter = express.Router();

academicTermRouter
  .route("/")
  .post(isLogin, isAdmin, createAcademicTerm)
  .get(isLogin, isAdmin, getAcademicTerms);

academicTermRouter
  .route("/:id")
  .get(isLogin, isAdmin, getAcademicTerm)
  .put(isLogin, isAdmin, updateAcademicTerm)
  .delete(isLogin, isAdmin, deleteAcademicTerm);

module.exports = academicTermRouter;
