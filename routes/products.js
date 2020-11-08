let express = require("express");
let router = express.Router();

let db = require("../controllers/product.js");
const Joi = require("joi");
const auth = require("../lib/utils/auth.js");

router.get("/", async (req, res, next) => {
  const products = await db.getProducts();
  console.warn("products->", products);
  res.send(products);
});

router.post("/", auth.checkTokenPost, async (req, res, next) => {
  const newProduct = await db.insertProduct(req.body);
  console.warn("Insert products ->", newProduct.ops);
  res.send(newProduct.ops);
});

router.delete("/:id", auth.checkTokenDelete, (req, res) => {
  db.deleteProduct(req.params.id).then((response) => {
    if (response.deletedCount === 1) res.status(204).send();
    else res.status(404).send({ message: "Product was not found." });
  });
});

router.put("/", auth.checkTokenUpdate, (req, res) => {
  db.updateProduct(req.body)
    .then((response) => {
      res.send({ message: "Product updated" });
    })
    .catch((error) => {
      res.status(404).send({ message: "Product not found." });
    });
});

module.exports = router;
