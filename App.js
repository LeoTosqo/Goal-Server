require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
const goalRouter = require("./routes/goalRouter");

//middleware, are fuction that on the server within req and res
app.use(express.json()); //parse json data

//home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to GOAL api",
  });
});
app.use("/goals", goalRouter);
//error route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Resource Not Found",
  });
});

const connectToDB = async () => {
  try {
    //db connection logic
    await mongoose.connect(process.env.MONGO_URL, { dbName: "goals" });
    app.listen(PORT, () => {
      console.log(`server running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
connectToDB();
