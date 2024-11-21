// Requirements
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// Imports
const { connectMongoDB } = require("./databaseConfig/connection");
const userRoute = require("./routes/userRoute");
const todoRoute = require("./routes/todoRoute");

// Connection Database
connectMongoDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Routes
app.use("/user", userRoute);
app.use("/todo", todoRoute);

// Setting server
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Server running in ${process.env.DEV_MODE} mode on port ${port}`);
});
