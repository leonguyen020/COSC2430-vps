const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
// mongoose.Promise = global.Promise;
mongoose
  .connect(
    db,
    { useNewUrlParser: true },
  ) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));
// Allow Cors all

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Use routes
const userRouter = require("./routes/api/user");
const advertisementRouter = require("./routes/api/advertisement");
const projectRouter = require("./routes/api/project");
const realEstateRouter = require("./routes/api/realEstate");

app.use("/api/users", userRouter);
app.use("/api/advertisements", advertisementRouter);
app.use("/api/projects", projectRouter);
app.use("/api/realEstates", realEstateRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.use(express.static(__dirname + "/public/"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
