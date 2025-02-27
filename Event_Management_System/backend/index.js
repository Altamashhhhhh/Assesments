require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./config/database");
const userRouter = require("./routes/user.route");
const eventRouter = require("./routes/event.route");
const enrollRouter = require("./routes/enroll.route");
const authentication = require("./middlewares/authentication");
const authorization = require("./middlewares/authorization")

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/event", authentication, eventRouter);
app.use("/enroll", [authentication  , authorization(["admin" , "user"])], enrollRouter);

app.get("/", (req, res) => {
  res.send("WELCOME TO EVENT MANAGEMENT SYSTEM");
});

const PORT = 8080;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server and database is connected on port ${PORT}`);
  } catch (error) {
    console.log("An error occured while running the server" , error);
  }
});
