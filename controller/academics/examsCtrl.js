const AsyncHandler = require("express-async-handler");
const Exam = require("../../model/Academic/Exam");
const Teacher = require("../../model/Staff/Teacher");

//@desc  Create Exam
//@route POST /api/v1/exams
//@acess  Private Teachers only

exports.createExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    createdBy,
    academicYear,
    classLevel,
  } = req.body;
  //check if teacher exists
  const teacherFound = await Teacher.findById(req.userAuth?._id);
  if (!teacherFound) {
    throw new Error("Teacher not found");
  }

  //exam exists
  const examExists = await Exam.findOne({ name });
  if (examExists) {
    throw new Error("Exam already exists");
  }

  //create exam
  const examCreated = new Exam({
    name,
    description,
    subject,
    classLevel,
    program,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    createdBy: req.userAuth._id,
    academicYear,
  });

  //push the exam into teacher
  teacherFound.examsCreated.push(examCreated._id);
  //save exam
  await examCreated.save();
  await teacherFound.save();

  //send teacher data
  res.status(201).json({
    status: "success",
    message: "Exam created successfully",
    data: examCreated,
  });
});

//@desc get all Exams
//@route Get /api/v1/exams
//@access private
exports.getExams = AsyncHandler(async (req, res) => {
  const exams = await Exam.find();
  res.status(200).json({
    status: "success",
    message: "Exams fetched successfully",
    data: exams,
  });
});

//@desc get single Exam
//@route Get /api/v1/exams/:id
//@access private
exports.getExam = AsyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Exam fetched successfully",
    data: exam,
  });
});

//@desc update Exam
//@route Put /api/v1/exams/:id
//@access private - Teacher only
exports.updateExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    createdBy,
    academicYear,
    classLevel,
  } = req.body;
  //check if name exists
  const examFound = await Exam.findOne({ name });
  if (examFound) {
    throw new Error("Exam already exists");
  }
  const updatedExam = await Exam.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      subject,
      program,
      academicTerm,
      duration,
      examDate,
      examTime,
      examType,
      academicYear,
      classLevel,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Exam updated successfully",
    data: updatedExam,
  });
});
