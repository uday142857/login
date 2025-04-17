require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const secret_key = process.env.JWT_SECRET || 'default_secret';
const connectdb = require("../connection/Connection");
const route = express.Router();

route.post("/login", async (req, res) => {
  var user = req.body;
  const collection = await connectdb();
  var data = await collection.findOne({ name: user.name });
  if (data === null) {
    res.json({
      ok: false,
      result: "Invalid User",
    });
  } else if (data.password != user.password) {
    res.json({
      ok: false,
      result: "Invalid password",
    });
  } else {
    //token created
    const token = jwt.sign(data, secret_key);
    console.log(token);
    res.json({
      ok: true,
      token: token,
    });
  }
  console.log(data);
  // res.send("working")
});
module.exports = route;
