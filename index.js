const express = require("express");
const connectDB = require("./config/db");

// Create server
const app = express();

// Connect to DB
connectDB();

// PORT
const port = process.env.PORT || 4000;

// Routes
app.use("/api/users", require("./routes/users"));

// Start app
app.listen(port, "0.0.0.0", () => {
  console.log(`The server is running in port ${port}`);
});
