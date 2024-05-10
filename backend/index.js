const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const env = require("dotenv").config();
const userRouter = require("./routes/userRoutes");
const isdRouter = require("./routes/isdCodeRoutes");
const bodyParser = require("body-parser");

const PORT = process.env.BACKEND_PORT;

app.use(morgan("dev"));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use("/api/user", userRouter);
app.use("/api", isdRouter);

app.listen(PORT, () => {
  console.log("Server started on ", PORT);
  connectDB();
});
