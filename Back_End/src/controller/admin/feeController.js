//Import Modules
const mongoose = require('mongoose');

//Import Files and Schema 
const Fees = require("../../models/students/school/feesSchema");
const Enrollment = require('../../models/students/enrollementSchema');
const Payment = require('../../models/Payment/paymentSchema');
const StudentFee = require('../../models/students/studentFeeSchema');
const Student = require('../../models/students/studentSchema')

const {validationResponse,successMessage,successResponse,errorResponse} =require('../../middleware/exception')

const addFees = async (req, res) => {
    try {
        const { feeName, feeAmount, feeDescription } = req.body;

        const {classId, sectionId } = req.query; 
        const adminId = req.user.id;

        // Build the query object
        let query = {};
        if(classId){
            query.classId = classId;
        }

        if(sectionId){
            query.section = sectionId
        }

        query.adminId = adminId;
        // Basic validation
        if (!feeName || feeName.trim().length === 0) {
            return res.status(400).json(validationResponse(
                400,
                "Fee Name is required "
            ));
        }

        if (!feeAmount || feeAmount <= 0) {
            return res.status(400).json(validationResponse(
                400,
                "Fee Amount is required "
            ));
        }

        if (!feeDescription || feeDescription.trim().length === 0) {
            return res.status(400).json(validationResponse(
                400,
                "Fee Description is required "
            ));
        }

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // getMonth() returns month from 0-11
        const currentYear = currentDate.getFullYear();


        const existingFees = await Fees.findOne({
            feeName,
            isDelete: false,
            isActive: true,

        });

        if (existingFees) {
            return res.status(403).json(validationResponse(403, "FeesName Already existing"));
        }

        const createFees = await Fees.create({
            feeName,
            feeAmount,
            feeDescription
        });

        let allDetails=[];
            const students = await Enrollment.find(query);

         for (let student of students) {     // Assuming students is an array, handle each student
            
                // Create payment
                const addPaymentFees = await Payment.create({
                    totalAmount: feeAmount,
                    balanceAmount: feeAmount
                });

               
                 // Create student fees
                 const addStudentFees = await new StudentFee({
                    enrollmentId: student._id,
                    feeId: createFees._id,
                    paymentId: addPaymentFees._id
                }).save();
                
                
                // Push payment result to allDetails
                allDetails.push({studentFees: addStudentFees,payment: addPaymentFees });
        }
        res.status(200).json(successResponse(
            200,
            "Fees Details Created Successfully",
            {fees: createFees , StudentDetails:allDetails }
        ));

    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse());
    }
};

const UpdateFeesClass = async (req, res) => {
    try {
        const {feeId} = req.params;
        const { feeName, feeAmount, feeDescription } = req.body; // Include feeId for update

        const { adminId, classId, sectionId } = req.query;

        // Build the query object
        let query = {};
        if (adminId) {
            query.adminId = adminId;
        }
        if (classId) {
            query.classId = classId;
        }
        if (sectionId) {
            query.section = sectionId;
        }

        // Basic validation
        if (!feeName || feeName.trim().length === 0) {
            return res.status(400).json(validationResponse(
                400,
                "Fee Name is required "
            ));
        }

        if (!feeAmount || feeAmount <= 0) {
            return res.status(400).json(validationResponse(
                400,
                "Fee Amount is required "
            ));
        }

        if (!feeDescription || feeDescription.trim().length === 0) {
            return res.status(400).json(validationResponse(
                400,
                "Fee Description is required "
            ));
        }

        if (!feeId) {
            return res.status(400).json(validationResponse(
                400,
                "Fee ID is required"
            ));
        }

        // Check if the fee exists
        const existingFees = await Fees.findById(feeId);
        if (!existingFees) {
            return res.status(404).json(validationResponse(
                404,
                "Fee not found"
            ));
        }

        // Update fee details
        existingFees.feeName = feeName;
        existingFees.feeAmount = feeAmount;
        existingFees.feeDescription = feeDescription;

        const updatedFees = await existingFees.save();

        let allDetails = [];
        if (adminId && adminId.length > 1) {
            const students = await Enrollment.find(query);

            // Assuming students is an array, handle each student
            for (let student of students) {
                // Update student fees
                const addStudentFees = await StudentFee.findOneAndUpdate(
                    { enrollmentId: student._id, feeId: feeId },
                    { feeId: updatedFees._id },
                    { new: true, upsert: true } // Upsert: create if not exists
                );

                // Update payment
                const addPaymentFees = await Payment.findOneAndUpdate(
                    { enrollmentId: student._id },
                    { totalAmount: feeAmount },
                    { new: true, upsert: true } // Upsert: create if not exists
                );

                // Push payment result to allDetails
                allDetails.push({
                    payment: addPaymentFees
                });
            }
        }

        res.status(200).json(successResponse(
            200,
            "Fees Details Updated Successfully",
            { fees: updatedFees, StudentDetails: allDetails }
        ));

    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse());
    }
};


const paymentFees = async (req, res) => {
    try {
        
        const { payFees } = req.body;
         
        // Basic validation
        if (!payFees || payFees <= 0) {
            return res.status(400).json(validationResponse(400, "Pay Fees is required and must be greater than zero"));
        }


        // Find the enrollment record by studentId
        const findEnrollment = await Enrollment.findOne({
            studentId:req.user.id,
        });


        if (!findEnrollment) {
            return res.status(404).json(validationResponse(404, "Enrollment record not found"));
        }

        // Find the payment record associated with the enrollment
        const findPayment = await Payment.findOne({
            enrollmentId: findEnrollment._id
        });

        if (!findPayment) {
            return res.status(404).json(validationResponse(404, "Payment record not found"));
        }

        // Update balance amount
        findPayment.balanceAmount -= payFees;

        // Save the updated payment record
        const updatedPayment = await findPayment.save();

        res.status(200).json(successResponse(200, "Pay Fees Successfully", updatedPayment));
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json(errorResponse());
    }
};

const getStudentfees = async (req, res) => {
    try {
        const studentId = req.user.id;
        const findEnrollment = await Enrollment.findOne({ studentId: studentId });
        if (!findEnrollment) {
            return res.status(404).json(validationResponse(404, "Enrollment Not Found"));
        }

        const findFeesDetails = await StudentFee.find({ enrollmentId: findEnrollment._id })
        .populate("feeId")
        .populate('paymentId')  // Populate paymentId to get Payment details

        if (!findFeesDetails) {
            return res.status(404).json(validationResponse(404, "Fees Details Not Found"));
        }

        const mappedData = findFeesDetails.map(feeDetail => {
            return {
                enrollmentId: feeDetail.enrollmentId,
                feeId: feeDetail.feeId._id,
                feeName: feeDetail.feeId.feeName,
                feeAmount: feeDetail.feeId.feeAmount,
                feeDescription: feeDetail.feeId.feeDescription,
                paymentId: feeDetail.paymentId._id,
                totalAmount: feeDetail.paymentId.totalAmount,
                balanceAmount: feeDetail.paymentId.balanceAmount
            };
        });

        res.status(200).json(successResponse(200, "Pay Fees Successfully", mappedData));

    } catch (error) {
        console.log(error);
        return res.status(500).json(errorResponse());
    }
};


const getAllFeesDetails = async (req, res) => {
    try {
        const adminId = req.user.id;

        // Find students with the adminId
        const findStudents = await Enrollment.find({ adminId });
    
        
        if (!findStudents || findStudents.length === 0) {
            return res.status(404).json(validationResponse(404, "No students found for this admin"));
        }
        const studentIds = findStudents.map(student => student._id);
        
        const allDetails = [];

for (let enrollmentId of studentIds) {

    // Find fee details for the current enrollment ID
    const findFeesDetails = await StudentFee.find({ enrollmentId: enrollmentId })
        .populate('enrollmentId')
        .populate('feeId')
        .populate('paymentId');

    // Check if findFeesDetails is populated correctly
    if (findFeesDetails.length === 0) {
        continue; // Skip to the next enrollment ID
    }

    // Iterate over each fee detail and find the corresponding student details
    for (let feeDetail of findFeesDetails) {
        const enrollmentId = feeDetail.enrollmentId._id;
        const findStudent = await Enrollment.find({_id:enrollmentId})
        .populate('studentId')
        .populate('classId')
        .populate('sectionId')
        for(let StudentDetails of findStudent){
            allDetails.push({
                    feeId: feeDetail.feeId._id,
                    feeName: feeDetail.feeId.feeName,
                    feeDescription: feeDetail.feeId.feeDescription,
                    feeAmount: feeDetail.feeId.feeAmount,
                    paymentId: feeDetail.paymentId._id,
                    balanceAmount: feeDetail.paymentId.balanceAmount,
                    studentId: StudentDetails.studentId._id,
                    firstName: StudentDetails.studentId.firstName,
                    lastName: StudentDetails.studentId.lastName,
                    gender: StudentDetails.studentId.gender,
                    rollNumber: StudentDetails.studentId.rollNumber,
                    email: StudentDetails.studentId.email,
                    mobileNumber: StudentDetails.studentId.mobileNumber,
                    address: StudentDetails.studentId.address,        
                    classId: StudentDetails.classId._id,
                    className: StudentDetails.classId.className,
                    sectionId: StudentDetails.sectionId._id,
                    sectionName: StudentDetails.sectionId.sectionName
            });
        }
        
            
        
        
    }
}


res.status(200).json(successResponse(200, "All Fees Details Retrieved Successfully", allDetails));

        


    } catch (error) {
        console.log(error);
        return res.status(500).json(errorResponse());
    }
};





const updateOneFeesDetails = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const { totalAmount, balanceAmount } = req.body;

        // Find the StudentFee record by paymentId
        const findStudentFee = await StudentFee.findOne({paymentId:paymentId});

        if (!findStudentFee) {
            return res.status(404).json(validationResponse(404, "Student Fee record not found"));
        }

        // Find the Payment record using the paymentId from the StudentFee record
        const findPayment = await Payment.findById(findStudentFee.paymentId);
        if (!findPayment) {
            return res.status(404).json(validationResponse(404, "Payment Details not found"));
        }

        // Update the Payment details
        if (totalAmount) {
            findPayment.totalAmount = totalAmount;
        }

        if (balanceAmount) {
            findPayment.balanceAmount = balanceAmount;
        }
        
        // Save the updated Payment record
        await findPayment.save();

        res.status(200).json(successResponse(200, "Fees Updated Successfully", findPayment));
    } catch (error) {
        console.log(error);
        return res.status(500).json(errorResponse());
    }
};


module.exports ={
    addFees,
    UpdateFeesClass,
    paymentFees,
    getStudentfees,
    getAllFeesDetails,
    updateOneFeesDetails
};