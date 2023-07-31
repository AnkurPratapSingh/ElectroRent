const express = require("express");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();

router.post("/addtocart", async (req, res) => {
  const cartToAdd = req.body;
  query = "insert into cart(userid,productid) values (?,?);";
 await connection.query(
    query,
    [cartToAdd.userid, cartToAdd.productid],
    (err, result) => {
      if (!err) {
        console.log("great");

        return res.status(200).json({ message: "Successfully Registered" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

// router.get('/getbyid/:id',(req,res)=>{
//     const id = req.params.id;
//   //  console.log(id);

//   responseArray=[];
//    query = "select * from cart where userid=?";
//    connection.query(query,[id],(err,result)=>{
//           if(!err)
//            {

//             result.forEach(element => {
//                 //console.log(element.id);
//                 query = "select * from product where id=?";

//                connection.query(query,[element.productid],(err,result)=>{
//                     if(!err){
//                         console.log(result[0]);
//                         responseArray.push(result[0]);
//                     }
//                 })

//             });
//             //console.log(result);
//             console.log("final");
//             console.log(responseArray);
//             return res.status(200).json(result);

//            }
//            else{
//             return res.status(500).json(err);
//            }
//     })
// })
router.get("/getbyid/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const cartQuery = "SELECT * FROM cart WHERE userid=?";
    const cartItems = await new Promise((resolve, reject) => {
      connection.query(cartQuery, [id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
    console.log(cartItems);

    const responseArray = [];
    for (const element of cartItems) {
      const productQuery = "SELECT * FROM product WHERE id=?";
      const product = await new Promise((resolve, reject) => {
        connection.query(productQuery, [element.productid], (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result[0]);
        });
      });

      product.cartId = element.id;

      console.log(product);
      responseArray.push(product);
    }

    console.log("final");
    console.log(responseArray);
    return res.status(200).json(responseArray);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/deleteCartItem/:id", async (req, res) => {
  const id = req.params.id;
  var query = "delete from cart where id=?";
  await connection.query(query, [id], (err, result) => {
    if (!err) {
      console.log("Item Deleted");
      return res
        .status(200)
        .json({ message: "Success your item has been removed" });
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/checkout", (req, res) => {
  const data = req.body;
  var query = "";
});

module.exports = router;
