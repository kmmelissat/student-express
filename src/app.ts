import express from "express";

const app = express();

const students = [
  { id: 1, name: "John Doe", age: 20, email: "john@example.com" },
  { id: 2, name: "Jane Smith", age: 22, email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", age: 21, email: "bob@example.com" },
];

// Middleware
app.use(express.json());

//Endpoints
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("/api/students", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.post("/api/students", (req, res) => {
  res.json({ message: "Hello World!" });
});

export default app;
