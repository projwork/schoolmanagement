const Admin = require("../../model/Staff/Admin");
//@desc Register admin
//@route POST /api/admins/register
//@access private
exports.registerAdminCtrl = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const adminFound = await Admin.findOne({ email });
    if (adminFound) {
      res.json("Admin exists");
    }

    const user = await Admin.create({ name, email, password });
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc login admins
//@route POST /api/v1/admins/login
//@access private
exports.loginAdminCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Admin has been logged in",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc Get all admins
//@route GET /api/v1/admins
//@access private
exports.getAdminsCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: "All admins",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc Get single admin
//@route Get /api/admins/:id
//@access private
exports.getAdminCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: "Single admin",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc Update admin
//@route Update /api/admins/:id
//@access private
exports.updateAdminCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: "admin updated",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc Delete admin
//@route Delete /api/admins/:id
//@access Private
exports.deleteAdminCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: "admin deleted",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc admin suspends a teacher
//@route Put /api/v1/admins/suspend/teacher/:id
//@access Private
exports.adminSuspendTeacherCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: "admin suspended teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc admin unsuspends a teacher
//@route Put /api/v1/admins/unsuspend/teacher/:id
//@access Private
exports.adminUnSuspendTeacherCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: "admin unsuspended teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc admin withdraw a teacher
//@route Put /api/v1/admins/withdraw/teacher/:id
//@access Private
exports.adminWithdrawTeacherCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: "admin withdraw teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc admin unwithdraw a teacher
//@route Put /api/v1/admins/unwithdraw/teacher/:id
//@access Private
exports.adminUnWithdrawCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: "admin unwithdraw teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc admin publishes an exam
//@route Put /api/v1/admins/publish/exam/:id
//@access Private
exports.adminPublishResultsCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: "admin publish exam",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc admin unpublishes an exam
//@route Put /api/v1/admins/unpublish/exam/:id
//@access Private
exports.adminUnPublishResultsCtrl = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: "admin unpublish exam",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
