//import modules
const express = require('express');
const router = express.Router();

//import files 
const adminController = require('../controller/admin/adminController')
const studentController = require('../controller/studentDetails/studentController');
const verifyToken = require('../middleware/auth');
const feeController = require('../controller/admin/feeController');
const circualrController = require('../controller/admin/circularController');


/**
 * @swagger
 * tags:
 *   name: Admin and Student
 *   description: API endpoints for admin and student Structure
 */

//admin router Methods

/**
 * @swagger
 * /admin:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Create a new admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Allwin"
 *               email:
 *                 type: string
 *                 example: "allwin@gmail.com"
 *               password:
 *                 type: string
 *                 example: "Allwin@2002"
 *               schoolId: 
 *                  type: string
 *                  example: "669a09fb89ac6ed5d4558098"
 *     responses:
 *       201:
 *         description: Admin created successfully
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
 *                   example: "Admin details created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Allwin"
 *                     email:
 *                       type: string
 *                       example: "allwin@gmail.com"
 *                     password:
 *                       type: string
 *                       example: "Allwin@2002"
 *                     schoolId: 
 *                       type: string
 *                       example: "669a09fb89ac6ed5d4558098"
 *       400:
 *         description: Bad Request 
 *       403:
 *         description: Forbidden 
 *       500:
 *         description: Internal Server Error
 */
router.post('/admin', adminController.createAdmin);

/**
 * @swagger
 * /admin/{id}:
 *   put:
 *     tags:
 *       - Admin
 *     summary: Update admin Details
 *     description: Update the details of a admin by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the admin to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Allwin"
 *               email:
 *                  type: string
 *                  example: "allwin@gmail.com"
 *               password:
 *                  type: string
 *                  example: "Allwin@2002"
 *               schoolId: 
 *                  type: string
 *                  example: "669a09fb89ac6ed5d4558098"
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
router.put('/admin/:id', verifyToken, adminController.updateAdminDetails);


/**
 * @swagger
 * /admin/{adminId}/students:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get Admin and Student Details
 *     description: Retrieve specific details of an Admin and all related Student details by the Admin's ID
 *     parameters:
 *       - name: adminId
 *         in: path
 *         required: true
 *         description: The ID of the Admin whose details and associated Students are to be retrieved
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved Admin and Student details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 admin:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60b6c9f2f1d1f60015d9c0a1"
 *                     name:
 *                       type: string
 *                       example: "Admin Name"
 *                     email:
 *                       type: string
 *                       example: "admin@example.com"
 *                     role:
 *                       type: string
 *                       example: "Administrator"
 *                 students:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60b6c9f2f1d1f60015d9c0a2"
 *                       name:
 *                         type: string
 *                         example: "Student Name"
 *                       email:
 *                         type: string
 *                         example: "student@example.com"
 *                       class:
 *                         type: string
 *                         example: "10th Grade"
 *       500:
 *         description: Internal Server Error
 */
router.get('/admin/allStudent', verifyToken, adminController.getStudentsByAdmin);


//admin Get one Details 
router.get('/admin', verifyToken, adminController.adminGetOneDetails)

//Admin Login call 
/**
 * @swagger
 * /admin/login:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Admin Login
 *     description: Authenticate an admin and generate access and refresh tokens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 example: "AdminPassword123!"
 *     responses:
 *       200:
 *         description: Admin login successful
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
 *                   example: "Admin Login Successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *                     refreshToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *                     adminDetails:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "60d5f4880f1c2c001f6f2f27"
 *                         email:
 *                           type: string
 *                           example: "admin@example.com"
 *                         schoolId:
 *                           type: string
 *                           example: "60d5f4880f1c2c001f6f2f27"   
 *       400:
 *         description: Bad Request - Missing email or password, or invalid email format
 *       401:
 *         description: Unauthorized - Admin not found or invalid email/password
 *       500:
 *         description: Internal Server Error
 */
router.post('/admin/login', adminController.adminLogin);

//student Login call
/**
 * @swagger
 * /student/login:
 *   post:
 *     tags:
 *       - Student
 *     summary: Student Login
 *     description: Authenticate an admin and generate access and refresh tokens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rollNumber:
 *                 type: string
 *                 example: 502681
 *               email:
 *                 type: string
 *                 example: "student@example.com"
 *               password:
 *                 type: string
 *                 example: "Student@12"
 *     responses:
 *       200:
 *         description: Student login successfully
 *       400:
 *         description: Bad Request - Missing email or password, or invalid email format
 *       401:
 *         description: Unauthorized - Admin not found or invalid email/password
 *       500:
 *         description: Internal Server Error
 */
router.post('/student/login',studentController.studentLogin)
//student router methods
/**
 * @swagger
 * /student:
 *   post:
 *     tags:
 *       - Student
 *     summary: Create a new Student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Allwin"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               gender:
 *                 type: string
 *                 example: "Male"
 *               rollNumber:
 *                 type: number
 *                 example: 5026816
 *               email:
 *                 type: string
 *                 example: "allwin@gmail.com"
 *               mobileNumber:
 *                 type: string
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: "123 Main St, Anytown, USA"
 *               password:
 *                 type: string
 *                 example: "Allwin@2002"
 *               classId: 
 *                 type: string
 *                 example: "669a09fb89ac6ed5d4558098"
 *               sectionId: 
 *                 type: string
 *                 example: "669a09fb89ac6ed5d4558098"
 *               schoolId: 
 *                 type: string
 *                 example: "669a09fb89ac6ed5d4558098"
 *     responses:
 *       201:
 *         description: Student created successfully
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
 *                   example: "Student details created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     student:
 *                       type: object
 *                       properties:
 *                         firstName:
 *                           type: string
 *                           example: "Allwin"
 *                         lastName:
 *                           type: string
 *                           example: "Doe"
 *                         gender:
 *                           type: string
 *                           example: "Male"
 *                         rollNumber:
 *                           type: Number
 *                           example: 5026816
 *                         email:
 *                           type: string
 *                           example: "allwin@gmail.com"
 *                         mobileNumber:
 *                           type: string
 *                           example: "9876543210"
 *                         address:
 *                           type: string
 *                           example: "123 Main St, Anytown, USA"
 *                         password:
 *                           type: string
 *                           example: "hashed_password"
 *                     enrollment:
 *                       type: object
 *                       properties:
 *                         studentId:
 *                           type: string
 *                           example: "669a09fb89ac6ed5d4558098"
 *                         schoolId: 
 *                           type: string
 *                           example: "669a09fb89ac6ed5d4558098"
 *                         classId: 
 *                           type: string
 *                           example: "669a09fb89ac6ed5d4558098"
 *                         sectionId: 
 *                           type: string
 *                           example: "669a09fb89ac6ed5d4558098"
 *       400:
 *         description: Bad Request - Missing required fields or invalid data
 *       403:
 *         description: Forbidden - Email or mobile number already registered
 *       500:
 *         description: Internal Server Error
 */
router.post('/student',verifyToken, studentController.registrationStudent);

/**
 * @swagger
 * /student/{id}:
 *   put:
 *     tags:
 *       - Student
 *     summary: Update an existing Student
 *     description: Update the details of an existing student by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the student to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Allwin"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               gender:
 *                 type: string
 *                 example: "Male"
 *               email:
 *                 type: string
 *                 example: "allwin@gmail.com"
 *               mobileNumber:
 *                 type: string
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: "123 Main St, Anytown, USA"
 *               password:
 *                 type: string
 *                 example: "Allwin@2002"
 *               classId:
 *                 type: string
 *                 example: "669a09fb89ac6ed5d4558098"
 *               sectionId:
 *                 type: string
 *                 example: "669a09fb89ac6ed5d4558098"
 *               schoolId:
 *                 type: string
 *                 example: "669a09fb89ac6ed5d4558098"
 *     responses:
 *       200:
 *         description: Student updated successfully
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
 *                   example: "Student details updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     student:
 *                       type: object
 *                       properties:
 *                         firstName:
 *                           type: string
 *                           example: "Allwin"
 *                         lastName:
 *                           type: string
 *                           example: "Doe"
 *                         gender:
 *                           type: string
 *                           example: "Male"
 *                         email:
 *                           type: string
 *                           example: "allwin@gmail.com"
 *                         mobileNumber:
 *                           type: string
 *                           example: "9876543210"
 *                         address:
 *                           type: string
 *                           example: "123 Main St, Anytown, USA"
 *                         password:
 *                           type: string
 *                           example: "hashed_password"
 *                     enrollment:
 *                       type: object
 *                       properties:
 *                         studentId:
 *                           type: string
 *                           example: "669a09fb89ac6ed5d4558098"
 *                         schoolId:
 *                           type: string
 *                           example: "669a09fb89ac6ed5d4558098"
 *                         classId:
 *                           type: string
 *                           example: "669a09fb89ac6ed5d4558098"
 *                         sectionId:
 *                           type: string
 *                           example: "669a09fb89ac6ed5d4558098"
 *       400:
 *         description: Bad Request - Missing required fields or invalid data
 *       403:
 *         description: Forbidden - Email or mobile number already registered
 *       500:
 *         description: Internal Server Error
 */
router.put('/student/:id',verifyToken, studentController.updateStudent);

/**
 * @swagger
 * /student/{id}:
 *   get:
 *     tags:
 *       - Student
 *     summary: Get one Student Details
 *     description: Get the Specific details of a student by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the student to get Details
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/student/:id', verifyToken, studentController.getOneStudentDetails);
/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     tags:
 *       - Student
 *     summary: Delete Student Details
 *     description: Delete the Specific Student by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the Student to Delete Details
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.delete('/student/:id', verifyToken, studentController.deleteStudent);

//Fees Details
/**
 * @swagger
 * /fees:
 *   post:
 *     tags:
 *       - Fees
 *     summary: Add new fees
 *     description: Adds new fees and associates them with students based on the specified class and section.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feeName:
 *                 type: string
 *                 example: "Tuition Fee"
 *               feeAmount:
 *                 type: number
 *                 example: 1000
 *               feeDescription:
 *                 type: string
 *                 example: "Monthly tuition fee"
 *             required:
 *               - feeName
 *               - feeAmount
 *               - feeDescription
 *     parameters:
 *       - name: classId
 *         in: query
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the class
 *       - name: sectionId
 *         in: query
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the section
 *     responses:
 *       200:
 *         description: Fees created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: already exists
 *       500:
 *         description: Internal server error
 */
router.post("/fees", verifyToken, feeController.addFees);

/**
 * @swagger
 * /fees/{paymentId}:
 *   put:
 *     tags:
 *       - Fees
 *     summary: Update Payment Details
 *     description: Updates the total and balance amount for a specific payment record identified by `paymentId`.
 *     parameters:
 *       - name: paymentId
 *         in: path
 *         required: true
 *         description: The ID of the payment record to be updated.
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totalAmount:
 *                 type: number
 *                 description: The total amount of the fee.
 *                 example: 2000
 *               balanceAmount:
 *                 type: number
 *                 description: The remaining balance of the fee.
 *                 example: 500
 *     responses:
 *       200:
 *         description: Payment details updated successfully.
 *       404:
 *         description: Payment details not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/fees/:paymentId', verifyToken, feeController.updateOneFeesDetails);

/**
 * @swagger
 * /class/{feeId}:
 *   put:
 *     tags:
 *       - Fees
 *     summary: Update Fees for a Class
 *     description: Updates the fees details for a specific class identified by `feeId`.
 *     parameters:
 *       - name: feeId
 *         in: path
 *         required: true
 *         description: The ID of the fee record to be updated.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Fees updated successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Fee already exists
 *       404:
 *         description: Fee not found
 *       500:
 *         description: Internal server error
 */
router.put('/class/:feeId', feeController.UpdateFeesClass);

/**
 * @swagger
 * /admin/fees:
 *   get:
 *     tags:
 *       - Fees
 *     summary: Retrieve All Fees Details
 *     description: Retrieves all fee details for students associated with the admin based on their ID.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all fees details for students.
 *       404:
 *         description: No students found for the admin.
 *       500:
 *         description: Internal server error.
 */
router.get('/admin/fees', verifyToken, feeController.getAllFeesDetails);

/**
 * @swagger
 * /std/fees:
 *   get:
 *     tags:
 *       - Fees
 *     summary: Get Fees Details for a Student
 *     description: Retrieves fee details for a specific student based on the authenticated user's ID.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved fee details for the student.
 *       404:
 *         description: Fees details not found for the student.
 *       500:
 *         description: Internal server error.
 */
router.get('/std/fees', verifyToken, feeController.getStudentfees);



//Payment Details
/**
 * @swagger
 * /payment:
 *   put:
 *     tags:
 *       - Payment
 *     summary: Pay fees
 *     description: Update the balance amount of a payment record by paying fees.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payFees:
 *                 type: number
 *                 example: 500
 *             required:
 *               - payFees
 *     responses:
 *       200:
 *         description: Pay Fees Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Pay Fees Successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     enrollmentId:
 *                       type: string
 *                     totalAmount:
 *                       type: number
 *                     balanceAmount:
 *                       type: number
 *       400:
 *         description: Fields is Required
 *       404:
 *         description:Data not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/payment',verifyToken, feeController.paymentFees);

/**
 * @swagger
 * /fees/{paymentId}:
 *   put:
 *     tags:
 *       - Fees
 *     summary: Update Payment Details
 *     description: Updates the total and balance amount for a specific payment record identified by `paymentId`.
 *     parameters:
 *       - name: paymentId
 *         in: path
 *         required: true
 *         description: The ID of the payment record to be updated.
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Bearer token for authentication.
 *         schema:
 *           type: string
 *           example: "Bearer your_jwt_token_here"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totalAmount:
 *                 type: number
 *                 description: The total amount of the fee.
 *                 example: 2000
 *               balanceAmount:
 *                 type: number
 *                 description: The remaining balance of the fee.
 *                 example: 500
 *     responses:
 *       200:
 *         description: Payment details updated successfully.
 *       404:
 *         description: Payment details not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/fees/:paymentId', verifyToken, feeController.updateOneFeesDetails);


//circular
/**
 * @swagger
 * /circular:
 *   post:
 *     tags:
 *       - Circular
 *     summary: Create a Circular
 *     description: Creates a new circular and associates it with students based on class and section IDs.
 *     parameters:
 *       - name: classId
 *         in: query
 *         description: ID of the class to filter students.
 *         schema:
 *           type: string
 *       - name: sectionId
 *         in: query
 *         description: ID of the section to filter students.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the circular.
 *               message:
 *                 type: string
 *                 description: Message content of the circular.
 *     responses:
 *       200:
 *         description: Circular created successfully and associated with students.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 circularDetails:
 *                   type: object
 *                   description: Details of the created circular.
 *                 studentDetails:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Details of each student associated with the circular.
 *       400:
 *         description: Bad request, missing required fields or invalid data.
 *       500:
 *         description: Internal server error.
 */
router.post('/circular', verifyToken, circualrController.createCircular);
/**
 * @swagger
 * /admin/circular:
 *   get:
 *     tags:
 *       - Circular
 *     summary: Get All Circulars for Admin
 *     description: Retrieves all circulars created by the admin.
 *     responses:
 *       200:
 *         description: Successfully retrieved all circulars.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 circulars:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Details of each circular.
 *       404:
 *         description: No circulars found.
 *       500:
 *         description: Internal server error.
 */
router.get('/admin/circular',verifyToken, circualrController.getAdminCircular);
/**
 * @swagger
 * /student/circular/{id}:
 *   delete:
 *     tags:
 *       - Circular
 *     summary: Delete a Circular Subscription
 *     description: Marks a circular subscription as deleted by setting `isDelete` to `true`.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the circular subscription to be deleted.
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Bearer token for authentication.
 *         schema:
 *           type: string
 *           example: "Bearer your_jwt_token_here"   
 *     responses:
 *       200:
 *         description: Circular subscription marked as deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Circular Subscription Updated Successfully"
 *                 data:
 *                   type: object
 *                   description: Details of the updated circular subscription.
 *       404:
 *         description: Circular subscription not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Circular subscription not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.delete('/student/circular/:id', verifyToken, circualrController.deleteCircular);

/**
 * @swagger
 * /admin/{id}:
 *   put:
 *     tags:
 *       - Circular
 *     summary: Update a Circular
 *     description: Updates the details of a circular based on its ID. Requires admin authentication.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the circular to be updated.
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Bearer token for authentication.
 *         schema:
 *           type: string
 *           example: "Bearer your_jwt_token_here"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the circular.
 *                 example: "Updated Circular Title"
 *               message:
 *                 type: string
 *                 description: Message of the circular.
 *                 example: "Updated Circular Message"
 *     responses:
 *       200:
 *         description: Circular updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Circular Updated Successfully"
 *                 data:
 *                   type: object
 *                   description: Details of the updated circular.
 *                   properties:
 *                     Circular:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "60b8d295f4d0c1b5a95a45d6"
 *                         title:
 *                           type: string
 *                           example: "Updated Circular Title"
 *                         message:
 *                           type: string
 *                           example: "Updated Circular Message"
 *                         isDelete:
 *                           type: boolean
 *                           example: false
 *       400:
 *         description: Bad request due to missing or invalid data.
 *       404:
 *         description: Circular not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/admin/:id',verifyToken, circualrController.updateCircular);

/**
 * @swagger
 * /student/circular:
 *   get:
 *     tags:
 *       - Circular
 *     summary: Retrieve a Circular for a Student
 *     description: Retrieves a circular for the authenticated student by finding the associated enrollment and circular subscription.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Circular retrieved successfully.
 *       404:
 *         description: Enrollment or circular not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/std/circular',verifyToken, circualrController.getOneCircualr );

module.exports = router;