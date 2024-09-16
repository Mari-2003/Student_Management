//import schemas and files
const School = require('../../../models/students/school/schoolSchema');
const Class = require ('../../../models/students/school/classSchema');
const Section = require('../../../models/students/school/sectionSchema');

// import exception handling
const {successResponse,successMessage,validationResponse,errorResponse} = require('../../../middleware/exception');


// create school details
const createSchool = async (req, res) => {
    try {
        // Input fields
        const { schoolName, telephoneNumber, location } = req.body;

        // Check if fields are provided
        if (!schoolName || schoolName.length === 0) {
            return res.status(400).json(validationResponse(400, "School name is required"));
        }

        if (!telephoneNumber || telephoneNumber.length === 0) {
            return res.status(400).json(validationResponse(400, "Telephone number is required"));
        }

        if (!location || location.length === 0) {
            return res.status(400).json(validationResponse(400, "Location is required"));
        }

        // Check if school name already registered
        const existingSchool = await School.findOne({ schoolName });
        if (existingSchool) {
            return res.status(403).json(validationResponse(403, "School name is already registered"));
        }

        // Check if telephone number already registered
        const existingTelephone = await School.findOne({ telephoneNumber });
        if (existingTelephone) {
            return res.status(403).json(validationResponse(403, "Telephone number is already registered"));
        }

        // Create school details
        const createSchoolDetails = await School.create({
            schoolName,
            telephoneNumber,
            location
        });

        // Send success response
        return res.status(201).json(successResponse(201, "School details created successfully", createSchoolDetails));

    } catch (error) {
        console.log(error);
        return res.status(500).json(errorResponse());
    }
}

//update School Details
const updateSchoolDetails = async(req,res)=>{
    const {id} = req.params;
    try{
        const {schoolName,telephoneNumber,location} = req.body;
        
        const findSchoolDetails = await School.findByIdAndUpdate({_id:id})
        
        if(!findSchoolDetails){
            res.status(404).json(validationResponse(404,"School data not found"));
        }

          // Check if schoolName is provided and update it if needed
          if (schoolName && schoolName !== findSchoolDetails.schoolName) {

            // Check if the new school name is already registered for another school
            const existingSchool = await School.findOne({ schoolName });
            if (existingSchool) {
                return res.status(403).json(validationResponse(403, "School name is already registered"));
            }
            findSchoolDetails.schoolName = schoolName;
        }

        // Check if telephoneNumber is provided and update it if needed
        if (telephoneNumber && telephoneNumber !== findSchoolDetails.telephoneNumber) {
            // Check if the new telephone number is already registered for another school
            const existingTelephone = await School.findOne({ telephoneNumber });
            if (existingTelephone) {
                return res.status(403).json(validationResponse(403, "Telephone number is already registered"));
            }
            findSchoolDetails.telephoneNumber = telephoneNumber;
        }

        if(location){
            findSchoolDetails.location = location
        }

        const schoolDetails = await findSchoolDetails.save();

        res.status(200).json(successResponse(200,"Updated Successfully",schoolDetails))

    }catch(error){
        console.log(error);
        res.status(500).json(errorResponse())

    }
};

//get All School Details 
const getAllSchoolDetails = async (req, res) => {
    try {
        // Extract the schoolName query parameter from the request
        const { schoolName } = req.query;

        // Build the query object
        let query = {};
        if (schoolName) {
            query.schoolName = { $regex: schoolName, $options: 'i' };
        }

        // Execute the query with the optional schoolName filter
        const getAllDetails = await School.find(query);

        res.status(200).json(successResponse(200, "Retrieve All Data Successfully", getAllDetails));
    } catch (error) {
        console.log(error);
        return res.status(500).json(errorResponse());
    }
};


//get One School Details 
const getOneSchoolDetails = async(req,res)=>{
    try{
        const {id} = req.params;
        const getOneDetails = await School.findById({_id:id});
        if(!getOneDetails){
            res.status(404).json(validationResponse(404,"School Data Not Found"));
        }
        res.status(200).json(successResponse(200,"School Details Retrieved Successfully",getOneDetails))

    }catch(error){
        console.log(error);
        return res.status(500).json(errorResponse());  
    }
}


// create class 
const createClass = async(req,res)=>{
    try{
        const {className} = req.body;
        if(!className || className.length ===0){
            return res.status(400).json(validationResponse(400, "class name is required"));
        }

        // Check if Class name already registered
        const existingClass = await School.findOne({ className });
        if (existingClass) {
            return res.status(403).json(validationResponse(403, "Class name is already registered"));
        };

        // Create class details
        const createClassDetails = await Class.create({ className });

         // Send success response
         return res.status(201).json(successResponse(201, "Class details created successfully", createClassDetails));

    }catch(error){
        console.log(error);
        return res.status(500).json(errorResponse());
    }
};

//get All Class Details 
const getAllClassDetails = async(req,res)=>{
    try{
         const getAllDetails = await Class.find()
         res.status(200).json(successResponse(200,"Retrieve All Data Successfully", getAllDetails));
    }catch(error){
        console.log(error);
        return res.status(500).json(errorResponse()); 
    }
}

// create Section 
const createSection = async(req,res)=>{
    try{
        const {sectionName} = req.body;

        if(!sectionName || sectionName.length ===0){
            return res.status(400).json(validationResponse(400, "Section name is required"));
        }


        const createSectionDetails = await Section.create({ sectionName });

        return res.status(201).json(successResponse(201, "Class details created successfully", createSectionDetails));

    }catch(error){
        console.log(error);
        return res.status(500).json(errorResponse());  
    }
}

//get All Section Details 
const getAllSectionDetails = async(req,res)=>{
    try{
         const getAllDetails = await Section.find()
         res.status(200).json(successResponse(200,"Retrieve All Data Successfully", getAllDetails));
    }catch(error){
        console.log(error);
        return res.status(500).json(errorResponse()); 
    }
}





module.exports = {
    createSchool,
    updateSchoolDetails,
    getAllSchoolDetails,
    getOneSchoolDetails,
    createClass,
    getAllClassDetails,
    createSection,
    getAllSectionDetails,
}