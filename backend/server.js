const express = require("express");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const dotenv = require("dotenv");
const app = express();
const connectDb = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

app.use(express.json());

dotenv.config();

connectDb();

const PORT = process.env.PORT || 5000;

app.use("/api/user", userRoutes);

app.use("/api/chat", chatRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`.yellow.bold);
});
