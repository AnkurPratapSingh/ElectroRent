const express = require("express");
const connection = require("../connection");
const router = express.Router();
var auth = require("../services/authentication");
var checkRole = require("../services/checkRole");

router.post("/add", async (req, res, next) => {
  let category = req.body;
  query = "insert into category (name) values(?)";
  await connection.query(query, [category.name], (err, result) => {
    if (!err) {
      return res.status(200).json({ message: "Category is added" });
    } else {
      return res.status(500).json(500);
    }
  });
});

router.get("/get", async (req, res) => {
  var query = "select * from category order by name";
  await connection.query(query, (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.patch("/update", async (req, res, next) => {
  let product = req.body;
  var query = "update category set name=? where id=?";
  await connection.query(query, [product.name, product.id], (err, result) => {
    if (!err) {
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: "category id does not found" });
      }
      return res
        .status(200)
        .json({ message: "Category is successfully updated" });
    }
  });
});
router.delete("/delete/:id", async (req, res, next) => {
  let id = req.params.id;
  var query = "delete from category where id=?";
  await connection.query(query, [id], (err, result) => {
    if (!err) {
      if (result.affectedRows == 0)
        return res.status(404).json({ message: "Category Id does not found" });
      else {
        console.log("Delete product");
        var query = "delete from product where categoryid=?";
        connection.query(query, [id], (err, result) => {
          if (!err) {
            return res
              .status(200)
              .json({ message: "Product and categoryis succesfully deleted" });
          } else {
            return res.status(500).json(err);
          }
        });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});
module.exports = router;
