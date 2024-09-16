//import modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

//import schemas and files
const Student = require("../../models/students/studentSchema");
const Class = require("../../models/students/school/classSchema");
const Section = require("../../models/students/school/sectionSchema");
const School = require("../../models/students/school/schoolSchema");

const Enrollment = require('../../models/students/enrollementSchema');

//import exception handling
const {
  successResponse,
  successMessage,
  validationResponse,
  errorResponse,
} = require("../../middleware/exception");

const registrationStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      rollNumber,
      email,
      mobileNumber,
      address,
      password,
      classId,
      sectionId,
    } = req.body;

    const missingFields = [];
    if (!firstName) missingFields.push("First name");
    if (!lastName) missingFields.push("Last name");
    if (!gender) missingFields.push("Gender");
    if(!rollNumber) missingFields.push("RollNumber");
    if (!email) missingFields.push("Email");
    if (!mobileNumber) missingFields.push("Mobile number");
    if (!address) missingFields.push("Address");
    if (!password) missingFields.push("Password");
    if (!classId) missingFields.push("Class ID");
    if (!sectionId) missingFields.push("Section ID");

    if (missingFields.length > 0) {
      return res.status(400).json(validationResponse(400,
            `${missingFields.join(", ")} ${
              missingFields.length > 1 ? "are" : "is"
            } required`
          )
        );
    }

     // Roll number validation: must be exactly 5 digits
     const rollNumberRegex = /^\d{6}$/;
     if (!rollNumberRegex.test(rollNumber)) {
       return res.status(400).json(validationResponse(
         400,
         "Roll Number must be exactly 6 digits long"
       ));
     }

     //rollNumber already in database or not 
     const existingRollNumber = await Student.findOne({
        rollNumber,
        isDelete:false
    });

    if(existingRollNumber){
        return res.status(403).json(validationResponse(403, "RollNumber already Registered"));
    }

    // email validation checking email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json(validationResponse(400, "Invalid email format"));
    }

     //email already in database or not 
     const existingEmail = await Student.findOne({
        email,
        isDelete:false
    });

    if(existingEmail){
        return res.status(403).json(validationResponse(403, "Email already Registered"));
    }
    

    //mobile number validation starting with 6, 7, 8, or 9
    const mobileRegex = /^[6-9]\d{9}$/;

    // Check if mobile number is valid
    if (!mobileRegex.test(mobileNumber)) {
      return res
        .status(400)
        .json(validationResponse(400, "Invalid mobile number"));
    }

    //mobile number already registered or not
    const existingMobileNumber = await Student.findOne({
      mobileNumber,
      isDelete:false
    });

    if(existingMobileNumber){
        return res.status(403).json(validationResponse(403, "Mobile Number is already Registered"));   
    }

           // Password validation: at least 8 characters, one uppercase, one special symbol
           const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

           // Check if password meets requirements
           if (!passwordRegex.test(password)) {
               return res.status(400).json(validationResponse(
                   400,
                   "Password must be at least 8 characters long and contain at least one uppercase letter and one special symbol"
               ));
           }

    // Hash the password before saving the student
    const hashedPassword = await bcrypt.hash(password, 10);

    const createStudent = await Student.create({
      firstName,
      lastName,
      gender,
      rollNumber,
      email,
      mobileNumber,
      address,
      password: hashedPassword,
    });

     // Create the enrollment
     const createEnrollment = await Enrollment.create({
        studentId: createStudent._id,
        adminId: req.user.id,
        classId,
        sectionId
      });

    res.status(201).json(
        successResponse(201, "Student Created SuccessFully", { student: createStudent, enrollment: createEnrollment })
      );
  }catch(error) {
    console.log(error);
    res.status(500).json(errorResponse());
  }
};

//Update Student 
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, gender, email, mobileNumber, address, password } = req.body;

        const findStudent = await Student.findOne({ _id: id, isDelete: false });

        if (!findStudent) {
            return res.status(404).json(validationResponse(404, "Student Data Not Found"));
        }

        if (firstName) {
            findStudent.firstName = firstName;
        }

        if (lastName) {
            findStudent.lastName = lastName;
        }

        if (gender) {
            findStudent.gender = gender;
        }

        if (email && email !== findStudent.email) {
            // Email validation checking email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json(validationResponse(400, "Invalid email format"));
            }

            // Check if email is already in the database
            const existingEmail = await Student.findOne({
                email,
                isDelete: false
            });

            if (existingEmail) {
                return res.status(403).json(validationResponse(403, "Email already registered"));
            }

            findStudent.email = email;
        }

        if (mobileNumber && mobileNumber !== findStudent.mobileNumber) {
            // Mobile number validation starting with 6, 7, 8, or 9
            const mobileRegex = /^[6-9]\d{9}$/;

            if (!mobileRegex.test(mobileNumber)) {
                return res.status(400).json(validationResponse(400, "Invalid mobile number"));
            }

            // Check if mobile number is already registered
            const existingMobileNumber = await Student.findOne({
                mobileNumber,
                isDelete: false
            });

            if (existingMobileNumber) {
                return res.status(403).json(validationResponse(403, "Mobile number is already registered"));
            }

            findStudent.mobileNumber = mobileNumber;
        }

        if (address) {
            findStudent.address = address;
        }

        if (password) {
            // Password validation: at least 8 characters, one uppercase, one special symbol
            const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

            if (!passwordRegex.test(password)) {
                return res.status(400).json(validationResponse(
                    400,
                    "Password must be at least 8 characters long and contain at least one uppercase letter and one special symbol"
                ));
            }

            // Hash the password before saving the student
            const hashedPassword = await bcrypt.hash(password, 10);
            findStudent.password = hashedPassword;
        }

        await findStudent.save();
        res.status(200).json(successResponse(200, "Student Details Updated Successfully", findStudent));
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse());
    }
};

//Get One Student 
const getOneStudentDetails = async(req,res)=>{
    try{
        const {id} = req.params;

         // Validate the ID format
         if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json(validationResponse(400, "Invalid ID format"));
        }

    const getSchoolDetails = await Enrollment.findOne({studentId:id})
    .populate('studentId')
    .populate('classId')
    .populate('sectionId')
        if(!getSchoolDetails){
            return res.status(404).json(validationResponse(404, "Student Data Not Found")); 
        }
        let data ={
          enrollmentId: getSchoolDetails._id,
          studentId: getSchoolDetails.studentId._id,
          firstName: getSchoolDetails.studentId.firstName,
          lastName: getSchoolDetails.studentId.lastName,
          gender: getSchoolDetails.studentId.gender,
          rollNumber: getSchoolDetails.studentId.rollNumber,
          email: getSchoolDetails.studentId.email,
          mobileNumber: getSchoolDetails.studentId.mobileNumber,
          adminId: getSchoolDetails.adminId,
          classId: getSchoolDetails.classId._id,
          className: getSchoolDetails.classId.className,
          sectionId: getSchoolDetails.sectionId._id,
          sectionName: getSchoolDetails.sectionId.sectionName
        }
      
        res.status(200).json(successResponse(200,"retrieve Successfully", data))

    }catch(error){
        console.log(error);
        res.status(500).json(errorResponse())
    }
};

//get All Student 
const getAllStudent = async(req,res)=>{
    try{
        const getAllStudent = await Student.find({isDelete:false})
        res.status(200).json(successResponse(200,"retrieve Successfully", getAllStudent))
    }catch(error){
        console.log(error);
        res.status(500).json(errorResponse())
    }
}

//Delete Student 
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json(validationResponse(400, "Invalid ID format"));
        }

        // Find the user
        const deleteStudent = await Student.findOne({ _id: id, isDelete: false });

        if (!deleteStudent) {
            return res.status(404).json(validationResponse(404, "Student Data Not Found"));
        }

        // Update the isDelete field to true
        deleteStudent.isDelete = true;

        // Save the changes
        await deleteStudent.save();

        res.status(200).json(successMessage(200, "Student deleted successfully"));
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse());
    }
};


// student Login Call
const studentLogin = async (req, res) => {
  try {
    const { rollNumber, email, password } = req.body;

    // Validation
    if (!rollNumber || rollNumber.length === 0) {
      return res.status(400).json(validationResponse(400, "RollNumber is required"));
    }
    if (!email || email.length === 0) {
      return res.status(400).json(validationResponse(400, "Email is required"));
    }
    if (!password || password.length === 0) {
      return res.status(400).json(validationResponse(400, "Password is required"));
    }

    // Roll number validation: must be exactly 6 digits
    const rollNumberRegex = /^\d{6}$/;
    if (!rollNumberRegex.test(rollNumber)) {
      return res.status(400).json(validationResponse(400, "Roll Number must be exactly 6 digits long"));
    }

    // Email validation: checking email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json(validationResponse(400, "Invalid email format"));
    }

    // Find the student by roll number and email
    const studentDetails = await Student.findOne({ rollNumber, email, isDelete: false });

    // Check if user exists
    if (!studentDetails) {
      return res.status(401).json(validationResponse(401, "Student not found"));
    }

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, studentDetails.password);
    if (!passwordMatch) {
      return res.status(401).json(validationResponse(401, "Invalid email or password"));
    }

    // Generate access token
    const accessToken = jwt.sign({ id: studentDetails._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    // Generate refresh token
    const refreshToken = jwt.sign({ id: studentDetails._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    // Prepare response data
    const data = {
      accessToken,
      refreshToken,
      studentDetails
    };

    // Send success response
    res.status(200).json(successResponse(200, "Student Login Successfully", data));

  } catch (error) {
    console.error(error);
    return res.status(500).json(errorResponse());
  }
};




module.exports = {
  registrationStudent,
  updateStudent,
  getOneStudentDetails,
  getAllStudent,
  deleteStudent,
  studentLogin,
};
