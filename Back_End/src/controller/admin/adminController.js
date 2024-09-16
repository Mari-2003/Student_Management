//import modules
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//import schema or files
const Admin = require("../../models/admin/adminSchema");
const School = require("../../models/students/school/schoolSchema");
const Enrollment = require("../../models/students/enrollementSchema");
const Student = require("../../models/students/studentSchema");

//import validation handling
const {
  successMessage,
  successResponse,
  validationResponse,
  errorResponse,
} = require("../../middleware/exception");

//create Admin
const createAdmin = async (req, res) => {
  try {
    const { name, email, password , schoolId} = req.body;

    const missingFields = [];
    if(!name) missingFields.push("name");
    if (!email) missingFields.push("Email");
    if (!password) missingFields.push("password");
    if(!schoolId) missingFields.push("SchoolId");

    if (missingFields.length > 0) {
      return res
        .status(400)
        .json(
          validationResponse(
            400,
            `${missingFields.join(", ")} ${
              missingFields.length > 1 ? "are" : "is"
            } required`
          )
        );
    }

    // email validation checking email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json(validationResponse(400, "Invalid email format"));
    }

    //email already in database or not
    const existingEmail = await Admin.findOne({
      email,
      isDelete: false,
    });

    if (existingEmail) {
      return res
        .status(403)
        .json(validationResponse(403, "Email already Registered"));
    }

    // Password validation: at least 8 characters, one uppercase, one special symbol
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

    // Check if password meets requirements
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json(
          validationResponse(
            400,
            "Password must be at least 8 characters long and contain at least one uppercase letter and one special symbol"
          )
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   // Check if school exists
   const school = await School.findById(schoolId);
   if (!school) {
       return res.status(404).json(validationResponse(404, "School not found"));
   }

    const createAdminDetails = await Admin.create({
      name,
      email,
      password: hashedPassword,
      schoolId
    });

    res.status(201).json(successResponse(201,"Admin Created Successfully", createAdminDetails));
  } catch (error) {
    console.log(error);
    return res.status(500).json(errorResponse());
  }
};

//update Admin 
const updateAdminDetails = async(req,res)=>{
    try{
        const{id} =req.params; 
        const {name, email, password} = req.body;

        const findAdmin = await Admin.findOne({_id:id,isDelete:false});
        if(!findAdmin){
            return res.status(404).json(validationResponse(404,"Admin Data is Not Found"));
        }

        if(name){
          findAdmin.name=name
        }

        if(email && email !== findAdmin.email){
             // email validation checking email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json(validationResponse(400, "Invalid email format"));
    }

    //email already in database or not
    const existingEmail = await Admin.findOne({
      email,
      isDelete: false,
    });

    if (existingEmail) {
      return res
        .status(403)
        .json(validationResponse(403, "Email already Registered"));
    }

    findAdmin.email = email
        }

        if(password){
             // Password validation: at least 8 characters, one uppercase, one special symbol
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

    // Check if password meets requirements
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json(
          validationResponse(
            400,
            "Password must be at least 8 characters long and contain at least one uppercase letter and one special symbol"
          )
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
        findAdmin.password = hashedPassword;
        }

        await findAdmin.save();

        res.status(200).json(successResponse(200,"Admin Details Update SuccessFully", findAdmin));

    }catch(error){
        console.log(error);
        res.status(500).json(errorResponse())
    }
} 

//get Admin details and also access student details
const getStudentsByAdmin = async (req, res) => {
  try {
      const  adminId  = req.user.id;

      // Find students in this school
      const students = await Enrollment.find({ adminId })
          .populate('studentId')
          .populate('classId')
          .populate('sectionId');

          const data = students.map(student => ({
            enrollmentId: student._id,
            studentId: student.studentId._id,
            firstName: student.studentId.firstName,
            lastName: student.studentId.lastName,
            gender: student.studentId.gender,
            rollNumber: student.studentId.rollNumber,
            email: student.studentId.email,
            mobileNumber: student.studentId.mobileNumber,
            adminId: student.adminId,
            classId: student.classId._id,
            className: student.classId.className,
            sectionId: student.sectionId._id,
            sectionName: student.sectionId.sectionName
        }));
        

      res.status(200).json(successResponse(200, "Students retrieved successfully", data));
  } catch (error) {
      console.log(error);
      res.status(500).json(errorResponse());
  }
};

// Admin Login call
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || email.length === 0) {
      return res.status(400).json(validationResponse(400, "Email is required"));
    }
    if (!password || password.length === 0) {
      return res.status(400).json(validationResponse(400, "Password is required"));
    }

    // Email validation: checking email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is valid
    if (!emailRegex.test(email)) {
      return res.status(400).json(validationResponse(400, "Invalid email format"));
    }

   
   const adminDetails = await Admin.findOne({ email, isDelete: false });
    

    // Check if user exists
    if (!adminDetails) {
      return res.status(401).json(validationResponse(401, "Admin not found"));
    }

    const passwordMatch = await bcrypt.compare(password, adminDetails.password);
    if (!passwordMatch) {
      return res.status(401).json(validationResponse(401, "Pasword is Invalid"));
    }

    // Generate access token
    const accessToken = jwt.sign({ id: adminDetails._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    // Generate refresh token
    const refreshToken = jwt.sign({ id: adminDetails._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    const data = {
      accessToken,
      refreshToken,
      adminDetails
    };

    res.status(200).json(successResponse(200, " Admin Login Successfully", data));
  } catch (error) {
    console.log(error);
    res.status(500).json(errorResponse());
  }
};

//admin get one details 
const adminGetOneDetails = async(req,res)=>{
  try{
    const adminId = req.user.id;
    const getOneAdminDetails = await Admin.findOne({_id:adminId}).populate('schoolId')
    if(!getOneAdminDetails){
      return res.status(404).json(validationResponse(404,"Admin Not Found"));
    }
    let data={
      id:getOneAdminDetails._id,
      name:getOneAdminDetails.name,
      email:getOneAdminDetails.email,
      password:getOneAdminDetails.password,
      isActive:getOneAdminDetails.isActive,
      schoolId:getOneAdminDetails.schoolId._id,
      schoolName:getOneAdminDetails.schoolId.schoolName,
      schoolLocation: getOneAdminDetails.schoolId.location
    }

    return res.status(200).json(successResponse(200,"Admin Details Retrieved SuccessFully",data));

  }catch(error){
      console.log(error);
      return res.status(500).json(errorResponse(500,"Internal Server Error"));
  }
}

module.exports = {
  createAdmin,
  updateAdminDetails,
  getStudentsByAdmin,
  adminLogin,
  adminGetOneDetails
};
