const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const env = require("dotenv").config();
const router = require("./routes/userRoutes");
const isdRouter = require("./routes/isdCodeRoutes");
const PORT = process.env.BACKEND_PORT;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/user", router);
app.use("/api", isdRouter);

app.listen(PORT, () => {
  console.log("Server started on ", PORT);
  connectDB();
});
