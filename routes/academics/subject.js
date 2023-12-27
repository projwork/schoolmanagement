const express = require("express");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const {
  createSubject,
  getSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
} = require("../../controller/academics/subjectsCtrl");

const subjectRouter = express.Router();

subjectRouter.post("/:programId", isLogin, isAdmin, createSubject);

subjectRouter.get("/", isLogin, isAdmin, getSubjects);

subjectRouter
  .route("/:id")
  .get(isLogin, isAdmin, getSubject)
  .put(isLogin, isAdmin, updateSubject)
  .delete(isLogin, isAdmin, deleteSubject);

module.exports = subjectRouter;
