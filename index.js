const express = require("express");

// Create server
const app = express();

console.log("Starting Node Send");

// PORT
const port = process.env.PORT || 4000;

// Start app
app.listen(port, "0.0.0.0", () => {
  console.log(`The server is running in port ${port}`);
});
