const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const app = express();
app.use(express.json());

const connectDB = require("./config/db");
connectDB();

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`); 
});
