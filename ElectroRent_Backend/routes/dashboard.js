const express = require("express");
const connection = require("../connection");
const router = express.Router();
var auth = require("../services/authentication");
var checkRole = require("../services/checkRole");

router.get("/details",  async (req, res, next) => {
  var categoryCount;
  var billCount;
  var poductCount;
   var userCount;
  var query = "select count(id) as categoryCount from category";
  await connection.query(query, (err, result) => {
    // console.log(result)
    if (!err) {
      categoryCount = result[0].categoryCount;
    } else {
      return res.status(500).json(err);
    }
  });

  var query = "select count(id) as productCount from product";
  connection.query(query, (err, result) => {
    //console.log(result)

    if (!err) {
      productCount = result[0].productCount;
    } else {
      return res.status(500).json(err);
    }
  });


  var query = "select count(id) as userCount from user";
  connection.query(query, (err, result) => {
    if (!err) {
      userCount = result[0].userCount;
     
     
    } else {
      return res.status(500).json(err);
    }
  });



  var query = "select count(id) as billCount from bill";
  connection.query(query, (err, result) => {
    if (!err) {
      billCount = result[0].billCount;
      var data = {
        category: categoryCount,
        product: productCount,
        bill: billCount,
        user:userCount
      };
      return res.status(200).json(data);
    } else {
      return res.status(500).json(err);
    }
  });
});

// router.get('/allUser')
module.exports = router;
