require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectDB = require("./database/connect");
const courseDetailsRouter = require("./routes/courseDetails");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");
const { getAllUsers } = require("./controllers/user_data");

const app = express();

app.use(express.json());

app.use("/api/user/course", courseDetailsRouter);
app.use("/api/admin/userdata", getAllUsers);
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
