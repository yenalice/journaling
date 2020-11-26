const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// TODO: url format should be <user>/entry/:id once users can be established!!!!

// for environment variables in .env file
require("dotenv").config();

// for creating express server
const app = express();
const port = process.env.PORT || 5000;

// cors middleware, allow us to parse json
app.use(cors());
app.use(express.json());

// need to set this environment variable for the connection to work
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// require & use router files
const entryRouter = require("./routes/entryRoute");
const userRouter = require("./routes/userRoute");
app.use("/entry", entryRouter);
app.use("/user", userRouter);

// starts the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
