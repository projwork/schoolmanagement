const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const Program = require("../../model/Academic/Program");

//@desc Create Program
//@route Post /api/v1/programs
//@access private
exports.createProgram = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  //check if exists
  const programFound = await Program.findOne({ name });
  if (programFound) {
    throw new Error("Program already exists");
  }

  const newProgram = await Program.create({
    name,
    description,
    createdBy: req.userAuth._id,
  });
  //push program into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.programs.push(newProgram._id);
  await admin.save();
  res.status(200).json({
    status: "success",
    message: "Program created successfully",
    data: newProgram,
  });
});

//@desc get all Programs
//@route Get /api/v1/programs
//@access private
exports.getPrograms = AsyncHandler(async (req, res) => {
  const programs = await Program.find();
  res.status(200).json({
    status: "success",
    message: "Programs fetched successfully",
    data: programs,
  });
});

//@desc get single Program
//@route Get /api/v1/programs/:id
//@access private
exports.getProgram = AsyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Program fetched successfully",
    data: program,
  });
});

//@desc update Program
//@route Put /api/v1/programs/:id
//@access private
exports.updateProgram = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  //check if name exists
  const program = await Program.findOne({ name });
  if (program) {
    throw new Error("Program already exists");
  }
  const updatedProgram = await Program.findByIdAndUpdate(
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
    message: "Program updated successfully",
    data: updatedProgram,
  });
});

//@desc delete Program
//@route Delete /api/v1/programs/:id
//@access private
exports.deleteProgram = AsyncHandler(async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Program deleted successfully",
  });
});
