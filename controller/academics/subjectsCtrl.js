const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const Subject = require("../../model/Academic/Subject");
const Program = require("../../model/Academic/Program");

//@desc Create Subject
//@route Post /api/v1/subjects/:programId
//@access private
exports.createSubject = AsyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;
  //find the program
  const programFound = await Program.findById(req.params.programId);
  if (!programFound) {
    throw new Error("Program not found");
  }
  //check if exists
  const subjectFound = await Subject.findOne({ name });
  if (subjectFound) {
    throw new Error("Subject already exists");
  }

  const newSubject = await Subject.create({
    name,
    description,
    academicTerm,
    createdBy: req.userAuth._id,
  });
  // push to the program
  programFound.subjects.push(newSubject._id);
  await programFound.save();

  res.status(201).json({
    status: "success",
    message: "Subject created successfully",
    data: newSubject,
  });
});

//@desc get all Subjects
//@route Get /api/v1/subjects/:programId
//@access private
exports.getSubjects = AsyncHandler(async (req, res) => {
  const subjects = await Subject.find();
  res.status(200).json({
    status: "success",
    message: "Subjects fetched successfully",
    data: subjects,
  });
});

//@desc get single Subject
//@route Get /api/v1/subjects/:id
//@access private
exports.getSubject = AsyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Subject fetched successfully",
    data: subject,
  });
});

//@desc update Subject
//@route Put /api/v1/subjects/:id
//@access private
exports.updateSubject = AsyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;
  //check if name exists
  const subjectFound = await Subject.findOne({ name });
  if (subjectFound) {
    throw new Error("Subject already exists");
  }
  const updatedSubject = await Subject.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      academicTerm,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Subject updated successfully",
    data: updatedSubject,
  });
});

//@desc delete Subject
//@route Delete /api/v1/subjects/:id
//@access private
exports.deleteSubject = AsyncHandler(async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Subject deleted successfully",
  });
});
