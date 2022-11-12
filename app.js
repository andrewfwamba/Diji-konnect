const express = require("express");
import routes from "./routes/contracts";
const bodyParser = require("body-parser");

require("dotenv").config();

require("./models/db");
const User = require("./models/user");
const userRouter = require("./routes/user");
const passwordReset = require("./routes/passwordReset");

const app = express();

//bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.json());

// User routes
app.use(userRouter);
// Reset pass
app.use(passwordReset);

// Contract routes
routes(app);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend connected" });
});

app.listen(8000, () => {
  console.log("Server running at 8000");
});
