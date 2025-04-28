const mongoose = require("mongoose");

function connectToDataBase() {
  mongoose.connect(process.env.DATABASE_URL);

  const db = mongoose.connection;
  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("Connected to Database"));
}

module.exports = connectToDataBase;
