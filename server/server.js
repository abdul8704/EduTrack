require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectDB = require("./database/connect");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");
const userRouter  = require("./routes/userRouter");
const adminRoutes = require("./routes/adminRouter");
const loginRouter = require("./routes/loginRouter");
const certificateRouter = require("./routes/certificateRouter");
const cors = require("cors");
// const authRoutes = require("./router/authRoutes");

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173", 
            "https://learn-zuntra-k8ox.vercel.app/",
            "https://learn-zuntra-az9i.vercel.app/",
            "https://learn-zuntra-az9i-abdul-azizs-projects-d53958bd.vercel.app/",
            "https://learn-zuntra-az9i-git-master-abdul-azizs-projects-d53958bd.vercel.app/", // 🚨 replace this with actual domain
        ],
    })  
);

app.use(express.json());

app.use("/api/login/", loginRouter);
app.use("/api/user/", userRouter);
app.use("/api/admin/", adminRoutes);
app.use("/api/certificate", certificateRouter);
app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware);

const start = async () => {
  const port = process.env.PORT || 3000;
  const url = process.env.MONGO_URI;

  try {
    await connectDB(url);
    console.log("Connected to the database...");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
}

start()
