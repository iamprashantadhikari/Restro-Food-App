const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

//dotenv config
dotenv.config();

//db connection
connectDb();

// rest object  --  We can use all the functions from the express framework from this.
const app = express();

//middlewares
app.use(cors()); //Cross-Origin Resource Sharing
app.use(express.json());
app.use(morgan("dev")); //http request logger in cmd(dev)

//route
app.use("/api/v1/test", require("./routes/web"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to the food-app server.</h1>");
});

// PORT
const PORT = process.env.PORT || 8080;

// Listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.white.bgMagenta);
});
