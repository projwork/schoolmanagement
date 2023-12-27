const bcrypt = require("bcryptjs");
const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
//@desc Register admin
//@route POST /api/admins/register
//@access private
exports.registerAdminCtrl = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const adminFound = await Admin.findOne({ email });
  if (adminFound) {
    throw new Error("Admin Exists");
  }

  const user = await Admin.create({
    name,
    email,
    password: await hashPassword(password),
  });
  res.status(201).json({
    status: "success",
    data: user,
    message: "Admin registered successfully",
  });
});

//@desc login admins
//@route POST /api/v1/admins/login
//@access private
exports.loginAdminCtrl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });
  if (!user) {
    return res.json({ message: "Invalid login credentials" });
  }
  //verify password
  const isMatched = await isPassMatched(password, user.password);

  if (!isMatched) {
    return res.json({ message: "Invalid login credentials" });
  } else {
    return res.json({
      data: generateToken(user._id),
      message: "Admin logged in successfully",
    });
  }
});

//@desc Get all admins
//@route GET /api/v1/admins
//@access private
exports.getAdminsCtrl = AsyncHandler(async (req, res) => {
  const admins = await Admin.find();
  res.status(200).json({
    status: "success",
    message: "Admin fetched successfully",
    data: admins,
  });
});

//@desc Get single admin
//@route Get /api/admins/:id
//@access private
exports.getAdminProfileCtrl = AsyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.userAuth)
    .select("-password -createdAt -updatedAt")
    .populate("academicYears");
  if (!admin) {
    throw new Error("Admin not found");
  } else {
    res.status(200).json({
      status: "success",
      data: admin,
    });
  }
});

//@desc Update admin
//@route Update /api/admins/:id
//@access private
exports.updateAdminCtrl = AsyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  const emailExist = await Admin.findOne({ email });
  if (emailExist) {
    throw new Error("This email is taken/exist");
  }

  //check if user is updating password
  if (password) {
    //update
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        password: await hashPassword(password),
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin updated successfully",
    });
  } else {
    //update
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin updated successfully",
    });
  }
});

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
