const express = require("express");
const connection = require("../connection");

const router = express.Router();
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
var fs = require("fs");
var uuid = require("uuid");
const auth = require("../services/authentication");
const { log, Console } = require("console");



router.post("/generateReport", async (req, res) => {
  const generateUuid = uuid.v1();
  const orderDetails = req.body;
  console.log("my orderDetails", orderDetails);
  var productDetailsReport = JSON.stringify(orderDetails.productDetails);
  var query =
    "insert into bill (name ,uuid,email,contactNumber,paymentMethod,total,productDetails,createdBy) values (?,?,?,?,?,?,?,?)";
  await connection.query(
    query,
    [
      orderDetails.name,
      generateUuid,
      orderDetails.email,
      orderDetails.contactNumber,
      orderDetails.paymentMethod,
      orderDetails.totalAmount,
      productDetailsReport,
      orderDetails.email,
    ],
    (err, result) => {
      if (!err) {
        ejs.renderFile(
          path.join(__dirname, "report.ejs"),
          {
            productDetails: orderDetails.productDetails,
            name: orderDetails.name,
            email: orderDetails.email,
            contactNumber: orderDetails.contactNumber,
            paymentMethod: orderDetails.paymentMethod,
            totalAmount: orderDetails.totalAmount,
          },
          (err, result) => {
            if (err) {
              console.log(err);
              console.log("Hi this is render");
              return res.status(500).json(err);
            } else {
              pdf
                .create(result, {
                  childProcessOptions: {
                    env: {
                      OPENSSL_CONF: "/dev/null",
                    },
                  },
                })
                .toFile(
                  "./generated_pdf/" + generateUuid + ".pdf",
                  function (err, data) {
                    if (err) {
                      console.log(err);
                      return res.status(500).json(err);
                    } else {
                      return res.status(200).json({ uuid: generateUuid });
                    }
                  }
                );
            }
          }
        );
      } else {
        // console.log("Hi");
        return res.status(500).json(err);
      }
    }
  );
});




router.get("/getPdf", async (req, res) => {
  const orderDetails = req.body;
  const uuid = req.query.uuid;

  console.log(orderDetails);
  const pdfPath = "./generated_pdf/" + uuid + ".pdf";
  if (fs.existsSync(pdfPath)) {
    res.contentType("application/pdf");
    fs.createReadStream(pdfPath).pipe(res);
  } else {
    var productDetailsReport = JSON.parse(orderDetails.productDetails);
    ejs.renderFile(
      path.join(__dirname, "report.ejs"),
      {
        productDetails: productDetailsReport,
        name: orderDetails.name,
        email: orderDetails.email,
        contactNumber: orderDetails.contactNumber,
        paymentMethod: orderDetails.paymentMethod,
        totalAmount: orderDetails.totalAmount,
      },
      (err, result) => {
        if (err) {
          console.log("Hi this is render");
          return res.status(500).json(err);
        } else {
          pdf
            .create(result, {
              childProcessOptions: {
                env: {
                  OPENSSL_CONF: "/dev/null",
                },
              },
            })
            .toFile(
              "./generated_pdf/" + orderDetails.uuid + ".pdf",
              function (err, data) {
                if (err) {
                  console.log(err);
                  return res.status(500).json(err);
                } else {
                  res.contentType("application/pdf");
                  fs.createReadStream(pdfPath).pipe(res);
                }
              }
            );
        }
      }
    );
  }
});




router.delete("/delete/:billId", async (req, res, next) => {
  const billId = req.params.billId;
  var query = "delete from bill where id=?";
  await connection.query(query, [billId], (err, result) => {
    if (!err) {
      if (result.affectedRows == 0)
        return res.status(404).json({ message: "Bill can not be generated" });
      else {
        return res
          .status(200)
          .json({ message: "Success! Record has been deleted" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});




router.get("/orderHistory/:email", async (req, res, next) => {
  const email = req.params.email;
  console.log(email);
  var orderValue = [];
  var num = 0;
  const query = "select * from bill where email = ?;";
  await connection.query(query, [email], (err, result) => {
    if (!err) {
      console.log("OrderHistroy");
      result.forEach((item) => {
        const products = JSON.parse(item.productDetails);
        products.forEach((data) => {
          // console.log(data);
          //console.log(products,"Productsss")
          orderValue.push(data);
          num++;
        });
        //  console.log("wdehwiuehdi",products.length);
        // orderValue.push(item.productDetails);
        console.log(num, "num value");
      });
      // console.log(orderValue);
      return res.status(200).json(orderValue);
    } else {
      return res.status(500).json(err);
    }
  });
});
module.exports = router;
