import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

const students = [
  { id: 1, name: "John Doe", age: 20, email: "john@example.com" },
  { id: 2, name: "Jane Smith", age: 22, email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", age: 21, email: "bob@example.com" },
];

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student API",
      version: "1.0.0",
      description: "A simple Express API for managing students",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/app.ts"], // Path to the API files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(express.json());

// Swagger UI
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - age
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the student
 *         name:
 *           type: string
 *           description: The name of the student
 *         age:
 *           type: integer
 *           description: The age of the student
 *         email:
 *           type: string
 *           description: The email of the student
 *       example:
 *         id: 1
 *         name: John Doe
 *         age: 20
 *         email: john@example.com
 *     NewStudent:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - age
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the student
 *         name:
 *           type: string
 *           description: The name of the student
 *         age:
 *           type: integer
 *           description: The age of the student
 *         email:
 *           type: string
 *           description: The email of the student
 *       example:
 *         id: 4
 *         name: Alice Johnson
 *         age: 19
 *         email: alice@example.com
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get welcome message
 *     description: Returns a welcome message
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello World!
 */
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     description: Retrieve a list of all students
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 students:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Student'
 */
app.get("/students", (req, res) => {
  res.json({ students });
});

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     description: Add a new student to the list
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewStudent'
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student created successfully
 *       400:
 *         description: Bad request
 */
app.post("/students", (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.status(201).json({ message: "Student created successfully" });
});

export default app;
