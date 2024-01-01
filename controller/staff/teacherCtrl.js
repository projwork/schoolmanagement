const AsyncHandler = require("express-async-handler");
const Teacher = require("../../model/Staff/Teacher");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");
//@desc  Admin Register Teacher
//@route POST /api/teachers/admin/register
//@acess  Private

exports.adminRegisterTeacher = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //check if teacher already exists
  const teacher = await Teacher.findOne({ email });
  if (teacher) {
    throw new Error("Teacher already employed");
  }
  //Hash password
  const hashedPassword = await hashPassword(password);
  // create
  const teacherCreated = await Teacher.create({
    name,
    email,
    password: hashedPassword,
  });
  //send teacher data
  res.status(201).json({
    status: "success",
    message: "Teacher registered successfully",
    data: teacherCreated,
  });
});

//@desc    login a teacher
//@route   POST /api/v1/teachers/login
//@access  Public

exports.loginTeacher = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //find the  user
  const teacher = await Teacher.findOne({ email });
  if (!teacher) {
    return res.json({ message: "Invalid login crendentials" });
  }
  //verify the password
  const isMatched = await isPassMatched(password, teacher?.password);
  if (!isMatched) {
    return res.json({ message: "Invalid login crendentials" });
  } else {
    res.status(200).json({
      status: "success",
      message: "Teacher logged in successfully",
      data: generateToken(teacher?._id),
    });
  }
});

//@desc    Get all Teachers
//@route   GET /api/v1/admin/teachers
//@access  Private admin only

exports.getAllTeachersAdmin = AsyncHandler(async (req, res) => {
  const teachers = await Teacher.find();
  res.status(200).json({
    status: "success",
    message: "Teachers fetched successfully",
    data: teachers,
  });
});

//@desc    Get Single Teacher
//@route   GET /api/v1/teachers/:teacherID/admin
//@access  Private admin only

exports.getTeacherByAdmin = AsyncHandler(async (req, res) => {
  const teacherID = req.params.teacherID;
  //find the teacher
  const teacher = await Teacher.findById(teacherID);
  if (!teacher) {
    throw new Error("Teacher not found");
  }
  res.status(200).json({
    status: "success",
    message: "Teacher fetched successfully",
    data: teacher,
  });
});

//@desc    Teacher Profile
//@route   GET /api/v1/teachers/profile
//@access  Private Teacher only

exports.getTeacherProfile = AsyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.userAuth?._id).select(
    "-password -createdAt -updatedAt"
  );
  if (!teacher) {
    throw new Error("Teacher not found");
  }
  res.status(200).json({
    status: "success",
    data: teacher,
    message: "Teacher Profile fetched  successfully",
  });
});

//@desc    Teacher updating profile admin
//@route    UPDATE /api/v1/teachers/:teacherID
//@access   Private Teacher only

exports.teacherUpdateProfile = AsyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  //if email is taken
  const emailExist = await Teacher.findOne({ email });
  if (emailExist) {
    throw new Error("This email is taken/exist");
  }

  //hash password
  //check if user is updating password

  if (password) {
    //update
    const teacher = await Teacher.findByIdAndUpdate(
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
      data: teacher,
      message: "Teacher updated successfully",
    });
  } else {
    //update
    const teacher = await Teacher.findByIdAndUpdate(
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
      data: teacher,
      message: "Teacher updated successfully",
    });
  }
});

//@desc     Admin updating Teacher profile
//@route    UPDATE /api/v1/teachers/:teacherID/admin
//@access   Private Admin only

exports.adminUpdateTeacher = AsyncHandler(async (req, res) => {
  const { program, classLevel, academicYear, subject } = req.body;
  //if teacher exists or not
  const teacherFound = await Teacher.findById(req.params.teacherID);
  if (!teacherFound) {
    throw new Error("Teacher not found");
  }
  //Check if teacher is withdrawn
  if (teacherFound.isWithdrawn) {
    throw new Error("Action denied, teacher is withdrawn");
  }
  //assign a program
  if (program) {
    teacherFound.program = program;
    await teacherFound.save();
    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Teacher updated successfully",
    });
  }

  //assign Class level
  if (classLevel) {
    teacherFound.classLevel = classLevel;
    await teacherFound.save();
    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Teacher updated successfully",
    });
  }

  //assign Academic year
  if (academicYear) {
    teacherFound.academicYear = academicYear;
    await teacherFound.save();
    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Teacher updated successfully",
    });
  }

  //assign subject
  if (subject) {
    teacherFound.subject = subject;
    await teacherFound.save();
    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Teacher updated successfully",
    });
  }
});
