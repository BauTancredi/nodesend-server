const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// Create server
const app = express();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");

//   // authorized headers for preflight requests
//   // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();

//   app.options("*", (req, res) => {
//     // allowed XHR methods
//     res.header(
//       "Access-Control-Allow-Methods",
//       "GET, PATCH, PUT, POST, DELETE, OPTIONS"
//     );
//     res.send();
//   });
// });

// Connect to DB
connectDB();

// Allow CORS
// const optionsCORS = {
//   origin: [
//     "http://localhost:3000",
//     "https://admiring-jones-9b5088.netlify.app",
//   ],
// };

app.use(cors());

// PORT
const port = process.env.PORT || 4000;

// Allow read body values
app.use(express.json());

// Allow public folder
app.use(express.static("uploads"));

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/links", require("./routes/links"));
app.use("/api/files", require("./routes/files"));

// Start app
app.listen(port, "0.0.0.0", () => {
  console.log(`The server is running in port ${port}`);
});
