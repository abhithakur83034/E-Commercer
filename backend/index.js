const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/user");
const Product = require("./db/product");
const product = require("./db/product");
// jwt ////////////////
const Jwt = require("jsonwebtoken");
//we haave to define key(this would be secret)
const jwtKey = "e-commerce";
const app = express();

app.use(express.json()); // middleware
app.use(cors());

//route

app.post("/register", async (req, res) => {
  // for saving data in db we use post
  try {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    // setup jwt token
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (error, token) => {
      if (error) {
        res.send({ result: "something went wrong, Please try after sometime" });
      }
      res.send({ result, auth: token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ result: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
  try {
    if (req.body.password && req.body.email) {
      let user = await User.findOne(req.body).select("-password");
      if (user) {
        // setup jwt token
        Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (error, token) => {
          if (error) {
            res.send({
              result: "something went wrong, Please try after sometime",
            });
          }
          res.send({ user, auth: token });
        });
      } else {
        res.send({ result: "No user found" });
      }
    } else {
      res.send({ result: "Missing email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ result: "An error occurred" });
  }
});

// for products//////////////////

app.post("/add-product", verifyToken, async (req, res) => {
  console.log(req.body);
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "An error occurred" });
  }
});

//for listing products

app.get("/products", verifyToken, async (req, res) => {
  // for getting data in db we use post
  console.log(req.body);
  try {
    const products = await Product.find();
    if (products.length > 0) {
      res.send(products);
    } else {
      res.send({ result: "No result found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "An error occurred" });
  }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "An error occurred" });
  }
});

// for updateing////////////////////// give us single data

app.get("/product/:id", verifyToken, async (req, res) => {
  // for getting data in db we use post
  console.log(req.body);
  try {
    const products = await Product.findOne({ _id: req.params.id });
    if (products) {
      res.send(products);
    } else {
      res.send({ result: "No result found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "An error occurred" });
  }
});

app.put("/product/:id", verifyToken, async (req, res) => {
  // for getting data in db we use post
  console.log(req.body);
  try {
    const products = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "An error occurred" });
  }
});

app.get("/search/:key", verifyToken, async (req, res) => {
  // for getting data in db we use post
  console.log(req.body);
  try {
    let result = await Product.find({
      $or: [
        { name: { $regex: req.params.key } },
        { price: { $regex: req.params.key } },
        { product: { $regex: req.params.key } },
        { brand: { $regex: req.params.key } },
      ],
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: "An error occurred" });
  }
});


function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
  
    Jwt.verify(token, jwtKey, (error, success) => {
      if (error) {
        res.send("Please provide valid token  ");
      } else {
        next();
      }
    });
  } else {
    res.status(500).send("Please add token with headers.");
  }
}

app.listen(5000);
