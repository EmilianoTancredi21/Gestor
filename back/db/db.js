const mongoose = require("mongoose");

const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connection established");
  } catch (error) {
    console.log("DB CONNECT error");
  }
};

module.exports = {
  db,
};
