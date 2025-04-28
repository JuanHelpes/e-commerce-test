require("dotenv").config(); // Load environment variables from .env file

const express = require("express");

const routes = require("./routes/usuarioRoutes");
const connectToDataBase = require("./database");

// Connect to the database
connectToDataBase();

// Initialize the Express application
const app = express();
const port = 3333;

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(routes);

app.listen(port, () => {
  console.log(`Backend started at http://localhost:${port}`);
});
