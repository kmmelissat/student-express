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
  apis: ["./src/app.ts"], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(express.json());

// Swagger UI
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//validar email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

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
 *         description: Bad request - Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Validation error message
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Name is required", "Age must be a number greater than 0", "Email format is invalid"]
 */
app.post("/students", (req, res) => {
  const { name, age, email, id } = req.body;
  const errors: string[] = [];

  //validar nombree
  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push("Name is required");
  }

  //validar edad
  if (!age || typeof age !== "number" || age <= 0) {
    errors.push("Age must be a number greater than 0");
  }

  //validar email
  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    errors.push("Email format is invalid");
  }

  //si hay errores, devolver 400
  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      errors: errors,
    });
  }

  const newStudent = { id, name: name.trim(), age, email };
  students.push(newStudent);
  res.status(201).json({
    message: "Student created successfully",
    student: newStudent,
  });
});

export default app;
