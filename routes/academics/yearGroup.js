const express = require("express");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const {
  createYearGroup,
  getYearGroup,
  updateYearGroup,
  getYearGroups,
  deleteYearGroup,
} = require("../../controller/academics/yearGroupsCtrl");

const yearGroupRouter = express.Router();

yearGroupRouter
  .route("/")
  .post(isLogin, isAdmin, createYearGroup)
  .get(isLogin, isAdmin, getYearGroups);

yearGroupRouter
  .route("/:id")
  .get(isLogin, isAdmin, getYearGroup)
  .put(isLogin, isAdmin, updateYearGroup)
  .delete(isLogin, isAdmin, deleteYearGroup);

module.exports = yearGroupRouter;