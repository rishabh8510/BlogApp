const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

//env config
dotenv.config();

//router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//mongodb connection
connectDB();

//rest objecct
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const DIRNAME = path.resolve();

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

app.use(express.static(path.join(DIRNAME, "/client/build")));
app.use("*",(_,res)=>{
  res.sendFile(path.resolve(DIRNAME, "client","build","index.html"));
});

// Port
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan
      .white
  );
});
