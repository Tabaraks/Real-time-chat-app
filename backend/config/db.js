const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Mongo DB connected ${connection.connection.host}`.blue.underline
    );
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDb;
