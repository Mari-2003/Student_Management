

const Enrollment = require('../../models/students/enrollementSchema');
const CircularSub = require('../../models/students/circularSubSchema')
const Circular = require('../../models/students/school/circularSchema');
const {validationResponse,successMessage,successResponse,errorResponse} =require('../../middleware/exception')

const createCircular = async (req, res) => {
    try {
        const adminId = req.user.id;
        const { title, message } = req.body;
        const { classId, sectionId } = req.query;

        // Basic validation
        if (!title || title.length === 0) {
            return res.status(400).json(validationResponse(400, "Title is required"));
        }
        if (!message || message.length === 0) {
            return res.status(400).json(validationResponse(400, "Message is required"));
        }

        // Build query object
        let query = {};
        if (classId) {
            query.classId = classId;
        }
        if (sectionId) {
            query.section = sectionId;
        }
        query.adminId = adminId;

        // Find all students based on the query
        const students = await Enrollment.find(query);

        // Check if students exist
        if (students.length === 0) {
            return res.status(404).json(validationResponse(404, "No students found for the specified criteria"));
        }

        // Create a new circular
        const circular = await Circular.create({
            adminId,
            title,
            message
        });

        let allDetails = [];

        // Create CircularSub for each student
        for (let student of students) {
            const newCircularSub = await CircularSub.create({
                enrollmentId: student._id,
                circularId: circular._id
            });
            allDetails.push({ CircularSub: newCircularSub });
        }

        res.status(200).json(successResponse(
            200,
            "Circular Created Successfully",
            { circularDetails: circular, studentDetails: allDetails }
        ));

    } catch (error) {
        console.error(error);
        return res.status(500).json(errorResponse());
    }
};


const deleteCircular = async (req, res) => {
    try {
        const circularId  = req.params.id;

        // Find the circular subscription by ID
        const circularSub = await CircularSub.findOne({_id: circularId});

        // Check if the circular subscription exists
        if (!circularSub) {
            return res.status(404).json(validationResponse(404, "Circular subscription not found"));
        }

        // Set isDelete to true
        circularSub.isDelete = true;

        // Save the updated circular subscription
        const updatedCircularSub = await circularSub.save();

        res.status(200).json(successResponse(
            200,
            "Circular Subscription Updated Successfully"
        ));

    } catch (error) {
        console.error(error);
        return res.status(500).json(errorResponse());
    }
};


const updateCircular = async (req, res) => {
    try {
        const {id}= req.params;
        const {title, message } = req.body;

        if (!title || title.length===0) {
            return res.status(400).json(validationResponse(400, "Title is required"));
        }
        if (!message || message.length===0) {
            return res.status(400).json(validationResponse(400, "Message is required"));
        }

        // Find the circular by ID
        const circular = await Circular.findOne({_id:id, isDelete:false});

        if (!circular) {
            return res.status(404).json(validationResponse(404, "Circular not found"));
        }

        // Update the circular details
        if (title) circular.title = title;
        if (message) circular.message = message;

        // Save the updated circular
        const updatedCircular = await circular.save();

        res.status(200).json(successResponse(
            200,
            "Circular Updated Successfully",
            { Circular: updatedCircular }
        ));

    } catch (error) {
        console.error(error);
        return res.status(500).json(errorResponse());
    }
};

const getAdminCircular = async(req,res)=>{
        try{
            const adminId = req.user.id

            const findCircular = await Circular.find({adminId});
            if(!findCircular){
                return res.status(404).json(validationResponse(404,"Data Not Found"))
            }
            res.status(200).json(successResponse(
                200,
                "Circular Updated Successfully",
                findCircular
            ));

        }catch(error){
            console.error(error);
            return res.status(500).json(errorResponse());
        }
};

const getOneCircualr = async (req, res) => {
    try {
      const studentId = req.user.id;
  
      const findEnrollment = await Enrollment.findOne({ studentId: studentId });
  
      if (!findEnrollment) {
        return res.status(404).json(validationResponse(404, "Enrollment not found"));
      }
  
      const findCircular = await CircularSub.find({ enrollmentId: findEnrollment._id, isDelete: false }).populate("circularId");
  
      if (!findCircular || findCircular.length === 0) {
        return res.status(404).json(validationResponse(404, "No Circular"));
      }
  
      // Map through the circulars to create the response data
      const data = findCircular.map(circular => ({
        circularId: circular._id,
        enrollmentId: circular.enrollmentId,
        circularTitleId: circular.circularId._id,
        title: circular.circularId.title,
        date: circular.circularId.date,
        message: circular.circularId.message,
        isDelete: circular.isDelete
      }));
  
      res.status(200).json(successResponse(
        200,
        "Circular Retrieved Successfully",
        data
      ));
  
    } catch (error) {
      console.error(error);
      return res.status(500).json(errorResponse());
    }
  };
  


module.exports ={
    createCircular,
    getAdminCircular,
    updateCircular,
    getOneCircualr,
    deleteCircular
    
}