const express = require("express");
const connection = require("../connection");
const router = express.Router();

const nodeMailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();
var auth = require("../services/authentication");
var checkRole = require("../services/checkRole");

router.post("/signup", async (req, res) => {
  let user = req.body;
  //  console.log(user);

  query = "select email,password,role,status from user where email=?";
  await connection.query(query, [user.email], (err, result) => {
    if (!err) {
      if (result.length <= 0) {
        query =
          "insert into user(name,contactNumber,email,password,status,role) values (?,?,?,?,'true','user');";
        connection.query(
          query,
          [user.name, user.contactNumber, user.email, user.password],
          (err, result) => {
            if (!err) {
              
              // res.cookie("jwt",token1,{
              //     httpOnly:true,
              //     maxAge:24*60*60*1000
              // })
              //  const token = jwt.sign(process.env.ACCESS_TOKEN, process.env.ACCESS_TOKEN);

             return res.status(200).json({message:'Registerd the user'})
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        return res.status(500).json({ message: "Email Already Present" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/login", async (req, res) => {
  const user = req.body;
  console.log(user);
  query = "select id ,email,password,role,status from user where email=?";
  await connection.query(query, [user.email], (err, result) => {
    console.log(result);
    const userData = result[0];
    if (!err) {
      if (result.length <= 0 || result[0].password != user.password) {
        return res
          .status(500)
          .json({ message: "Username or Passsword is incorrect" });
      } else if (result[0].status == "false") {
        return res.status(401).json({ message: "Waiting for admin approval" });
      } else if (result[0].password == user.password) {
        const response = { email: result[0].email, role: result[0].role };
        const token = jwt.sign(
          { email: result[0].email, id: result[0].id, role: result[0].role },
          process.env.ACCESS_TOKEN
        );
        // res.cookie("jwt",token1,{
        //     httpOnly:true,
        //     maxAge:24*60*60*1000
        // })
        //  const token = jwt.sign(process.env.ACCESS_TOKEN, process.env.ACCESS_TOKEN);

        res.json({ token });

        //res.status(200).json({message:"success"})
      } else {
        return res
          .status(500)
          .json({ message: "Something went wrong try again" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.send({ message: "success" });
});

var transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.delete("/deleteUser/:id",async (req,res)=>{
  const id = req.params.id;
  console.log(id);
  query = "delete from user where id = ? ";
  await connection.query(query , [id] , (err,result)=>{
    if(!err){
      return res.status(200).json({messge:"Successfully Deleted the  user"});
    }
    else{
      return res.status(500).json(err);
    }
  })
})
router.post("/forgotPassword", async (req, res) => {
  console.log(process.env.EMAIL);
  const user = req.body;
  query = "select email,password,role,status from user where email=?";
  await connection.query(query, [user.email], (err, result) => {
    if (!err) {
      if (result.length <= 0) {
        return res
          .status(200)
          .json({ message: "Password sent to your email succesfully" }); // if no user exist as hacker cannot know whther the email is present or not
      } else {
        var mailOptions = {
          from: process.env.EMAIL,
          to: result[0].email,
          subject: "Password by Electro_rent",
          html:
            "<p><b>Your login details </b><br><b> Email:</b>" +
            result[0].email +
            "<br><b>Password: </b>" +
            result[0].password +
            '<br><a href="">Click to login</a></p>',
        }; // href local host later add on
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent : " + info.response);
          }
        });
        return res
          .status(200)
          .json({ message: "Password sent to your email succesfully" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/get", async (req, res) => {
  // const user = req.body;
  query = "select name ,id ,email,role,status from user where role='user';";
  await connection.query(query, (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/check", async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", ""); // Get the JWT from the 'Authorization' header
    console.log(token);
    const claims = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log("this is for admin", claims);
    var userId;
    if (claims.id == undefined) userId = claims;
    else userId = claims.id;
    console.log(userId, "claims");
    if (!claims) return res.status(401).json({ message: "unauthenticated" });

    var query = "select * from user where id = ?";
    await connection.query(query, [userId], (err, result) => {
      const userData = result[0];
      //delete userData.password
      // console.log(1234);
      console.log(userData);
      //console.log(1234);
      return res.status(200).json(userData);
    });
  } catch (err) {
    return res.status(401).json({ message: "unauthenticated" });
  }
  // const claims = jwt.verify(cookie,ACCESS_TOKEN )
  // if(!claims){
  //     return res.status(401).send({
  //         message:"unauthenticated"
  //     })
  // }
  // console.log(claims)
  // return 0;
});

router.post("/changePassword", async (req, res) => {
  const user = req.body;
  const email = res.locals.email;
  var query = "select * from user where email = ? and password=?";
  await connection.query(query, [email, user.oldPassword], (err, result) => {
    if (!err) {
      if (result.length <= 0) {
        return res.status(400).json({ message: "Incorect old password" });
      } else if (result[0].password == user.oldPassword) {
        query = "update user set password =? where email = ?";
        connection.query(query, [user.newPassword, email], (err, result) => {
          if (!err) {
            return res
              .status(200)
              .json({ message: "Password Changed succesfully" });
          } else {
            return res.status(500).json(err);
          }
        });
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/getUserById/:id", async (req, res) => {
  const id = req.params.id;
  query = "select name,email,contactNumber from user where id=?";
  await connection.query(query, [id], (err, result) => {
    if (!err) return res.status(200).json(result);
    else {
      return res.status(500).json(err);
    }
  });
});


module.exports = router;
