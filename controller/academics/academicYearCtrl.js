const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");
const Admin = require("../../model/Staff/Admin");

//@desc Create Academic Year
//@route Post /api/v1/academic-years
//@access private
exports.createAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;
  //check if exists
  const academicYear = await AcademicYear.findOne({ name });
  if (academicYear) {
    throw new Error("Academic year already exists");
  }

  const newAcademicYear = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: req.userAuth._id,
  });
  //push academic year into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.academicYears.push(newAcademicYear._id);
  await admin.save();
  res.status(200).json({
    status: "success",
    message: "Academic year created successfully",
    data: newAcademicYear,
  });
});

//@desc get all Academic Years
//@route Get /api/v1/academic-years
//@access private
exports.getAcademicYears = AsyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.find();
  res.status(200).json({
    status: "success",
    message: "Academic years fetched successfully",
    data: academicYears,
  });
});

//@desc get single Academic Year
//@route Get /api/v1/academic-years/:id
//@access private
exports.getAcademicYear = AsyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Academic year fetched successfully",
    data: academicYears,
  });
});

//@desc update Academic Year
//@route Put /api/v1/academic-years/:id
//@access private
exports.updateAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;
  //check if name exists
  const academicYear = await AcademicYear.findOne({ name });
  if (academicYear) {
    throw new Error("Academic year already exists");
  }
  const updatedAcademicYear = await AcademicYear.findByIdAndUpdate(
    req.params.id,
    {
      name,
      fromYear,
      toYear,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Academic year updated successfully",
    data: updatedAcademicYear,
  });
});

//@desc delete Academic Year
//@route Delete /api/v1/academic-years/:id
//@access private
exports.deleteAcademicYear = AsyncHandler(async (req, res) => {
  const academicYear = await AcademicYear.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Academic year deleted successfully",
  });
});
