// import modules
const express = require('express');
const router = express.Router();

//import controller files
const schoolController = require('../controller/studentDetails/schools/schoolController');
const verifyToken = require('../middleware/auth')


/**
 * @swagger
 * tags:
 *   name: School
 *   description: API endpoints for school Structure
 */

// School router methods defined

/**
 * @swagger
 * /school:
 *   post:
 *     tags:
 *       - School
 *     summary: Create a new school
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               schoolName:
 *                 type: string
 *                 example: "Matrit Matriculation Higher Secondary School"
 *               telephone:
 *                 type: string
 *                 example: "123-456-7890"
 *               location:
 *                 type: string
 *                 example: "123 Main St, Anytown, USA"
 *     responses:
 *       201:
 *         description: School created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "School details created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     schoolName:
 *                       type: string
 *                       example: "Greenwood High"
 *                     telephone:
 *                       type: string
 *                       example: "123-456-7890"
 *                     location:
 *                       type: string
 *                       example: "123 Main St, Anytown, USA"
 *       400:
 *         description: Bad Request - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "School name is required"
 *       403:
 *         description: Forbidden - School name or telephone number already registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "School name is already registered"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.post('/school', schoolController.createSchool);

/**
 * @swagger
 * /school/{id}:
 *   put:
 *     tags:
 *       - School
 *     summary: Update school Details
 *     description: Update the details of a school by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the school to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               schoolName:
 *                 type: string
 *                 example: "Matrit Matriculation Higher Secondary School"
 *               telephoneNumber:
 *                 type: string
 *                 example: "123-456-7890"
 *               location:
 *                 type: string
 *                 example: "123 Main St, Anytown, USA"
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request 
 *       403:
 *         description: Forbidden 
 *       500:
 *         description: Internal Server Error
 */
router.put('/school/:id', schoolController.updateSchoolDetails);

/**
 * @swagger
 * /school:
 *   get:
 *     tags:
 *       - School
 *     summary: Get All School Details
 *     description: Get the details of all schools
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/school', schoolController.getAllSchoolDetails);

/**
 * @swagger
 * /school/{id}:
 *   get:
 *     tags:
 *       - School
 *     summary: Get school Details
 *     description: Get the Specific details of a school by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the school to get Details
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/school/:id', schoolController.getOneSchoolDetails);

// class Router Methods Defined

/**
 * @swagger
 * /class:
 *   post:
 *     tags:
 *       - Class
 *     summary: Create a new Class
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               className:
 *                 type: string
 *                 example: "I"
 *     responses:
 *       201:
 *         description: Class created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Class details created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     className:
 *                       type: string
 *                       example: "I"
 *       400:
 *         description: Bad Request
 *       403:
 *         description: Forbidden 
 *       500:
 *         description: Internal Server Error
 */
router.post('/class', schoolController.createClass);

/**
 * @swagger
 * /class:
 *   get:
 *     tags:
 *       - Class
 *     summary: Get All Class Details
 *     description: Get the details of all Classes
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/class', schoolController.getAllClassDetails);

//section Router Methods Defined

/**
 * @swagger
 * /section:
 *   post:
 *     tags:
 *       - Section
 *     summary: Create a new section
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sectionName:
 *                 type: string
 *                 example: "A"
 *     responses:
 *       201:
 *         description: Section created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Section details created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     sectionName:
 *                       type: string
 *                       example: "A"
 *       400:
 *         description: Bad Request
 *       403:
 *         description: Forbidden 
 *       500:
 *         description: Internal Server Error
 */
router.post('/section', schoolController.createSection);
/**
 * @swagger
 * /section:
 *   get:
 *     tags:
 *       - Section
 *     summary: Get All section Details
 *     description: Get the details of all sections
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/section', schoolController.getAllSectionDetails);





// Exports the router instance for use in the main app
module.exports = router;