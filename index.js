import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import myData from "./models/myData.js";
import path from "path";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
import axios from "axios";

//===============================varible to use express=====================================================

const app = express();
const __dirname = path.resolve();
const PORT = 3000;

//==================================bodyparser===================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
// ================================== connect to mongoose db ===================================================

mongoose
  .connect(
    "mongodb+srv://mohamedalicoder:mohamedaalli@cluster0.mvsvf7x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// ================================= Livereload setup ====================================================

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

app.use(connectLiveReload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// ===================================== to get all data from database ================================================
app.get("/", async (req, res) => {
  // const data = await axios.get("https://fakestoreapi.com/products");
  myData
    .find()
    .then((result) => {
      res.render("index.ejs", { arr: result, /* Data: data.data*/ });
    })
    .catch((err) => {
      console.log(err);
    });

});

// ===================================== to post  data to database ================================================
app.post("/user/add.html", async (req, res) => {
  try {
    await myData.create(req.body);
    res.redirect("/user/add.html");
  } catch (error) {
    res.status(500).send("Error saving data: " + error.message);
  }
});


// =====================================delete========================================================

app.delete("/delete/:id", (req, res) => {
  myData.deleteOne({ _id: req.params.id }).then(() => {
    res.redirect("/");
  });
})

// ===================================== to get bages ================================================

app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});

app.get("/user/edit.html", (req, res) => {
  res.render("user/edit");
});

app.get("/user/view.html", (req, res) => {
  res.render("user/view");
});

//====================================================API================================

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
