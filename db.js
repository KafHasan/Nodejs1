const mongoose = require("mongoose");

// Connect to MongoDB database named musicdb
mongoose.connect("mongodb://localhost/musicdb");

module.exports = mongoose;
