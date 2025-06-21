import express from "express";

const app = express();

// Middleware
app.use(express.json());

//Endpoints
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.get('/api/students', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.post('/api/students', (req, res) => {
  res.json({ message: 'Hello World!' });
});

export default app; 