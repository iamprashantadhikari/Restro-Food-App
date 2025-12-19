const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Database Connected Successfully ${mongoose.connection.host}`.bgWhite
    );
  } catch (error) {
    console.log("Db Error", error);
  }
};

module.exports = connectDb;
