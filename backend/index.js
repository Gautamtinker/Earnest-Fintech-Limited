const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const taskRoute = require("./Routes/taskRoute");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
app.use(bodyParser.json());

// Parse URL-encoded bodies for form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", taskRoute);

const port = 4000; // Use process.env.PORT for the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
