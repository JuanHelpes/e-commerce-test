require("dotenv").config(); // Load environment variables from .env file

const express = require("express");

const usersRoutes = require("./routes/usuarioRoutes"); // Import user routes
const productsRoutes = require("./routes/produtoRoutes"); // Import product routes
const carrinhoRoutes = require("./routes/carrinhoRoutes"); // Import cart routes

const connectToDataBase = require("./database");
const cors = require("cors"); // Import CORS middleware

// Connect to the database
connectToDataBase();

// Initialize the Express application
const app = express();
const port = 3333;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON request bodies

app.use("/user", usersRoutes);
app.use("/product", productsRoutes); // Use product routes
app.use("/carrinho", carrinhoRoutes); // Use cart routes

app.listen(port, () => {
  console.log(`Backend started at http://localhost:${port}`);
});
