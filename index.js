const path = require("path");
// import data = require("./my-app/build/index.html")
const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const goalRoutes = require("./routes/goalRoutes");
const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// stack: process.env.NODE_ENV === "production" ? null : err.stack,

// if (process.env.NODE_ENV === "production") {
//   console.log("this is production ");
// } else {
//   console.log("this is local");
// }

app.use(cors());

app.use("/api/goals", goalRoutes);
app.use("/api/users", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.json("this is working");
});


app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
