const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const env = require("dotenv").config();
const userRouter = require("./routes/userRoutes");
const isdRouter = require("./routes/isdCodeRoutes");
const pwdRouter = require("./routes/passwordRoutes");

const path = require("path");

const PORT = process.env.BACKEND_PORT;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(morgan("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://127.0.0.1:5500"],
    credentials: true,
  })
);
app.set('view engine', 'ejs')


app.use("/api/user", userRouter);
app.use("/api", isdRouter);
app.use("/api/user", pwdRouter);

app.listen(PORT, () => {
  console.log("Server started on ", PORT);
  connectDB();
});
