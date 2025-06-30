const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const port=5000 || process.env.port;
const app = express();
app.use(cors());
app.use(express.json());
//mongoose.connect("mongodb://localhost:27017/authDemo");
mongoose.connect("mongodb+srv://kfupmdcc2010:Hasan123@cluster0.dviam6i.mongodb.net/authDemo");

app.use("/api/auth", authRoutes);
app.listen(port, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
