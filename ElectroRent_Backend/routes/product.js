const express = require("express");
const connection = require("../connection");
const router = express.Router();

const auth = require("../services/authentication");
const checkRole = require("../services/checkRole");

router.post("/add", async (req, res, next) => {
  let product = req.body;
  console.log(product);
  var query =
    "insert into product (name , categoryId,description,price,imageUrl, status) values (?,?,?,?,?,'true')"; //true for product active default
  await connection.query(
    query,
    [
      product.name,
      product.id,
      product.description,
      product.price,
      product.imageUrl,
    ],
    (err, result) => {
      if (!err) {
        return res.status(200).json({ message: "product added succesfully" });
      } else {
        console.log("Not adeed ");
        return res.status(500).json(err);
      }
    }
  );
});

// router.get("/get", auth.authenticationToken, (req, res, next) => {
//   let product = req.body;
//   var query =
//     "select p.id,p.name,p.description,p.price,p.status ,c.id as categoryId,c.name as categoryName from product as p inner join category as c where p.categoryId = c.id"; //true for product active default
//   connection.query(query, (err, result) => {
//     if (!err) {
//       return res.status(200).json(result);
//     } else {
//       return res.status(500).json(err);
//     }
//   });
// });

router.get("/getByCategory/:id", async (req, res, next) => {
  const id = req.params.id;
  var query =
    "select id ,name ,price , description ,imageUrl from product where categoryId = ? and status='true'";
  await connection.query(query, [id], (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/getById/:id", async (req, res, next) => {
  const id = req.params.id;
  var query =
    "select id ,name ,description,price from product where id = ? and status='true'";
  await connection.query(query, [id], (err, result) => {
    if (!err) {
      return res.status(200).json(result[0]);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.patch("/update", async (req, res, next) => {
  let product = req.body;
  var query =
    "update product set name = ? ,categoryId = ? , description = ? , price = ? where id = ?";
  await connection.query(
    query,
    [
      product.name,
      product.categoryId,
      product.description,
      product.price,
      product.id,
    ],
    (err, result) => {
      if (!err) {
        if (result.affectedRows == 0) {
          return res
            .status(404)
            .json({ message: "The product is not present" });
        } else {
          return res
            .status(200)
            .json({ message: "Product is successfully updated" });
        }
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

router.delete("/delete/:id", async (req, res, next) => {
  let id = req.params.id;
  var query = "delete from product where id=?";
  await connection.query(query, [id], (err, result) => {
    if (!err) {
      if (result.affectedRows == 0)
        return res.status(404).json({ message: "Product Id does not found" });
      else
        return res
          .status(200)
          .json({ message: "Product is succesfully deleted" });
    } else {
      return res.status(500).json(err);
    }
  });
});

router.patch(
  "/changeStatus",
  auth.authenticationToken,
  checkRole.checkRole,
  (req, res, next) => {
    const product = req.body;
    var query = "update product set status = ? where id = ?";
    connection.query(query, [product.status, product.id], (err, result) => {
      if (!err) {
        if (result.affectedRows == 0)
          return res.status(404).json({ message: "Product Id does not found" });
        else
          return res
            .status(200)
            .json({ message: "Product status updated succesfully" });
      } else {
        return res.status(500).json(err);
      }
    });
  }
);
module.exports = router;
