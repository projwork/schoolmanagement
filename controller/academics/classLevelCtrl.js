const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const ClassLevel = require("../../model/Academic/ClassLevel");

//@desc Create Class Level
//@route Post /api/v1/class-levels
//@access private
exports.createClassLevel = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  //check if exists
  const classFound = await ClassLevel.findOne({ name });
  if (classFound) {
    throw new Error("Class level already exists");
  }

  const newClassLevel = await ClassLevel.create({
    name,
    description,
    createdBy: req.userAuth._id,
  });
  //push class level into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.classLevels.push(newClassLevel._id);
  await admin.save();
  res.status(200).json({
    status: "success",
    message: "Class level created successfully",
    data: newClassLevel,
  });
});

//@desc get all Class Level
//@route Get /api/v1/class-levels
//@access private
exports.getClassLevels = AsyncHandler(async (req, res) => {
  const classLevels = await ClassLevel.find();
  res.status(200).json({
    status: "success",
    message: "Class levels fetched successfully",
    data: classLevels,
  });
});

//@desc get single Class level
//@route Get /api/v1/class-levels/:id
//@access private
exports.getClassLevel = AsyncHandler(async (req, res) => {
  const classLevel = await ClassLevel.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Class level fetched successfully",
    data: classLevel,
  });
});

//@desc update Class level
//@route Put /api/v1/class-levels/:id
//@access private
exports.updateClassLevel = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  //check if name exists
  const classLevel = await ClassLevel.findOne({ name });
  if (classLevel) {
    throw new Error("Class level already exists");
  }
  const updatedClassLevel = await ClassLevel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Class level updated successfully",
    data: updatedClassLevel,
  });
});

//@desc delete CLass level
//@route Delete /api/v1/class-levels/:id
//@access private
exports.deleteClassLevel = AsyncHandler(async (req, res) => {
  await ClassLevel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Class level deleted successfully",
  });
});
