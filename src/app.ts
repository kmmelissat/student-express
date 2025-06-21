import express from "express";

const app = express();

// Middleware
app.use(express.json());

// Single Hello World endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

export default app; 