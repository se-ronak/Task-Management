const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(process.env.MONGODB_URI, {});

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("\x1b[32mConnected to MongoDB\x1b[0m");
  });

  return db;
}

module.exports = connectDB;
