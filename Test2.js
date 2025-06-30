const jwt = require("jwt-simple");

const secret = "supersecret";
const payload = { username: "Hasan" };

// 🔐 Create a JWT
const token = jwt.encode(payload, secret);
console.log("Token: " + token);

// 🔓 Decode the JWT
const decoded = jwt.decode(token, secret);
console.log("Decoded payload: " + decoded.username);
