const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

require("./config/dotenv");

const connectDB = require("./config/database");
connectDB();

const staticPath = path.join("../www/dist");
app.use(express.static(staticPath));

const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\x1b[32mServer is running on port ${PORT}\x1b[0m`);
});
