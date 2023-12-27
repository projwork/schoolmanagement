const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const YearGroup = require("../../model/Academic/YearGroup");

//@desc Create Year Group
//@route Post /api/v1/year-groups
//@access private
exports.createYearGroup = AsyncHandler(async (req, res) => {
  const { name, description, academicTerm, academicYear } = req.body;

  //check if exists
  const yearGroup = await YearGroup.findOne({ name });
  if (yearGroup) {
    throw new Error("Year Group already exists");
  }

  const newYearGroup = await YearGroup.create({
    name,
    academicYear,
    createdBy: req.userAuth._id,
  });
  // push to the program
  // find the admin
  const admin = await Admin.findById(req.userAuth._id);
  if (!admin) {
    throw new Error("Admin not found");
  }
  admin.yearGroups.push(newYearGroup._id);
  await admin.save();

  res.status(201).json({
    status: "success",
    message: "Year group created successfully",
    data: newYearGroup,
  });
});

//@desc get all Year Group
//@route Get /api/v1/year-groups
//@access private
exports.getYearGroups = AsyncHandler(async (req, res) => {
  const yearGroups = await YearGroup.find();
  res.status(200).json({
    status: "success",
    message: "Year groups fetched successfully",
    data: yearGroups,
  });
});

//@desc get single year group
//@route Get /api/v1/year-groups/:id
//@access private
exports.getYearGroup = AsyncHandler(async (req, res) => {
  const yearGroup = await YearGroup.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Year group fetched successfully",
    data: yearGroup,
  });
});

//@desc update Year group
//@route Put /api/v1/year-groups/:id
//@access private
exports.updateYearGroup = AsyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;
  //check if name exists
  const yearGroupFound = await YearGroup.findOne({ name });
  if (yearGroupFound) {
    throw new Error("Year group already exists");
  }
  const updatedYearGroup = await YearGroup.findByIdAndUpdate(
    req.params.id,
    {
      name,
      academicYear,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Year group updated successfully",
    data: updatedYearGroup,
  });
});

//@desc delete Year group
//@route Delete /api/v1/year-groups/:id
//@access private
exports.deleteYearGroup = AsyncHandler(async (req, res) => {
  await YearGroup.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Year group deleted successfully",
  });
});
