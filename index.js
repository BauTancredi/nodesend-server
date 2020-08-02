const express = require("express");
const connectDB = require("./config/db");

// Create server
const app = express();

// Connect to DB
connectDB();

// PORT
const port = process.env.PORT || 4000;

// Allow read body values
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/links", require("./routes/links"));
app.use("/api/files", require("./routes/files"));

// Start app
app.listen(port, "0.0.0.0", () => {
  console.log(`The server is running in port ${port}`);
});
