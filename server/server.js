require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectDB = require("./database/connect");
const courseDetailsRouter = require("./routes/userRouter");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");
const userRouter  = require("./routes/userRouter");
const adminRoutes = require("./routes/adminRouter");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user/", userRouter);
app.use("/api/admin/", adminRoutes);
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
