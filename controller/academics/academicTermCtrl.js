const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const AcademicTerm = require("../../model/Academic/AcademicTerm");

//@desc Create Academic Term
//@route Post /api/v1/academic-terms
//@access private
exports.createAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  //check if exists
  const academicTerm = await AcademicTerm.findOne({ name });
  if (academicTerm) {
    throw new Error("Academic term already exists");
  }

  const newAcademicTerm = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: req.userAuth._id,
  });
  //push academic year into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.academicTerms.push(newAcademicTerm._id);
  await admin.save();
  res.status(200).json({
    status: "success",
    message: "Academic term created successfully",
    data: newAcademicTerm,
  });
});

//@desc get all Academic Terms
//@route Get /api/v1/academic-terms
//@access private
exports.getAcademicTerms = AsyncHandler(async (req, res) => {
  const academicTerms = await AcademicTerm.find();
  res.status(200).json({
    status: "success",
    message: "Academic terms fetched successfully",
    data: academicTerms,
  });
});

//@desc get single Academic term
//@route Get /api/v1/academic-terms/:id
//@access private
exports.getAcademicTerm = AsyncHandler(async (req, res) => {
  const academicYears = await AcademicTerm.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Academic term fetched successfully",
    data: academicYears,
  });
});

//@desc update Academic Term
//@route Put /api/v1/academic-terms/:id
//@access private
exports.updateAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  //check if name exists
  const academicTerm = await AcademicTerm.findOne({ name });
  if (academicTerm) {
    throw new Error("Academic year already exists");
  }
  const updatedAcademicTerms = await AcademicTerm.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      duration,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Academic term updated successfully",
    data: updatedAcademicTerms,
  });
});

//@desc delete Academic Term
//@route Delete /api/v1/academic-terms/:id
//@access private
exports.deleteAcademicTerm = AsyncHandler(async (req, res) => {
  await AcademicTerm.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Academic term deleted successfully",
  });
});
