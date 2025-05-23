const express = require("express");
const mysqlPool = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

app.get("/check-up", (req, res) => {
  res.send("Hello from server");
});

const schoolRouter = require("./routes/schools.routes")
app.use("/api/v1", schoolRouter);

mysqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("Database connect successfully");
    app.listen(PORT, () => {
      console.log(`Server is running at port number ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
