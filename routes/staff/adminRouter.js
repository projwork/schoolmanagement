const express = require("express");
const {
  registerAdminCtrl,
  loginAdminCtrl,
  getAdminsCtrl,
  updateAdminCtrl,
  deleteAdminCtrl,
  adminSuspendTeacherCtrl,
  adminUnSuspendTeacherCtrl,
  adminWithdrawTeacherCtrl,
  adminUnWithdrawCtrl,
  adminPublishResultsCtrl,
  adminUnPublishResultsCtrl,
  getAdminProfileCtrl,
} = require("../../controller/staff/adminCtrl");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");

const adminRouter = express.Router();

// register
adminRouter.post("/register", registerAdminCtrl);

// login
adminRouter.post("/login", loginAdminCtrl);

// get all admin
adminRouter.get("/", isLogin, getAdminsCtrl);

// get single admin
adminRouter.get("/profile", isLogin, isAdmin, getAdminProfileCtrl);

// update admin
adminRouter.put("/", isLogin, isAdmin, updateAdminCtrl);

// delete admin
adminRouter.delete("/:id", deleteAdminCtrl);

// admin suspending a teacher
adminRouter.put("/suspend/teacher/:id", adminSuspendTeacherCtrl);

// admin Unsuspending a teacher
adminRouter.put("/unsuspend/teacher/:id", adminUnSuspendTeacherCtrl);

// admin withdrawing a teacher
adminRouter.put("/withdraw/teacher/:id", adminWithdrawTeacherCtrl);

// admin unwithdrawing a teacher
adminRouter.put("/unwithdraw/teacher/:id", adminUnWithdrawCtrl);

// admin publish exam results
adminRouter.put("/publish/exam/:id", adminPublishResultsCtrl);

// admin unpublish exam results
adminRouter.put("/unpublish/exam/:id", adminUnPublishResultsCtrl);

module.exports = adminRouter;
