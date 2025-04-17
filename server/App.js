require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const db_url = process.env.DB_URL || "mongodb://localhost:27017";
const client = new MongoClient(db_url);
const app = express();
var Userdata = require("./users/Auth");

app.use(cors());
app.use(express.json());

app.use("/auth", Userdata);
app.post("/newuser", async (req, res) => {
  console.log(req.body);
  //   res.send("start");
  await client.connect();
  const db = client.db("logdb");
  const collection = db.collection("Udata");
  const edata = await collection.findOne({ name: req.body.name });
  const eno = await collection.findOne({ phno: req.body.phno });
  console.log(edata);
  if (edata) {
    res.send({
      status: false,
      result: "User Existed",
    });
  } else if (eno) {
    if (eno.phno === req.body.phno) {
      res.send({
        status: false,
        result: "Used phoneno",
      });
    }
  } else {
    const data = await collection.insertOne(req.body);
    res.send({
      status: true,
      result: "Insterted Succuessfull",
    });
    console.log(data);
  }
});

app.get(
  "/userdata",
  (req, res, next) => {
    const token = req.headers.authorization.slice(7);

    jwt.verify(token, "udayaudauafadaaiadda", (error, decode) => {
      if (error) {
        res.json({
          ok: false,
          result: "token is invalid",
        });
      } else {
        next();
      }
    });
  },
  async (req, res) => {
    await client.connect();
    const db = client.db("logdb");
    const collection = db.collection("Udata");
    const udata = await collection.find().toArray();
    res.send(udata);
  }
);
app.delete("/removeuser/:id", async (req, res) => {
  await client.connect();
  const db = client.db("logdb");
  const collection = db.collection("Udata");
  var result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
  console.log(result);
  res.json({
    satus: true,
    message: " Removed",
  });
});

app.get("/getoneuser/:id", (req, res) => {
  console.log(req.headers.authorization.slice(7));
  const token = req.headers.authorization.slice(7);
  jwt.verify(token, "udayaudauafadaaiadda", async (error, decode) => {
    if (error) {
      res.json({
        ok: false,
        result: "token is invalid",
      });
    } else {
      await client.connect();
      const db = client.db("logdb");
      const collection = db.collection("Udata");
      var result = await collection.findOne({
        _id: new ObjectId(req.params.id),
      });
      if (!result) {
        res.json({
          status: false,
          message: "invalid id",
        });
      } else {
        // console.log(result);
        res.send({
          status: true,
          message: result,
        });
      }
    }
  });
});
app.put("/updateuser", async (req, res) => {
  var newid = req.body;
  var id = newid._id;
  delete newid._id;
  await client.connect();
  const db = client.db("logdb");
  const collection = db.collection("Udata");
  var data = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: newid }
  );
  res.send("updated");
});

app.listen(9191, () => {
  console.log("started");
});

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const mongoose = require("mongoose");
// const userModule = require("./connection/connetmongoose");

// app.use(cors());
// app.use(express.json());

// async function connectmongoose() {
//   await mongoose.connect("mongodb://localhost:27017/newdb");
// }
// connectmongoose();
// app.get("/getuser", async (req, res) => {
//   var data = await userModule.find();
//   res.send({
//     status: true,
//     result: data,
//   });
// });
// app.post("/addone", async(req, res) => {
//   var newdata = req.body;
//   var user = new userModule(newdata);
//   await user.save();
//   res.json({
//       ok: true,
//       result: "user added",
//     });
// });
// app.listen(2222, () => {
//   console.log("working");
// });
