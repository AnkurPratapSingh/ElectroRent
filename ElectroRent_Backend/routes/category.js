const express = require('express')
const connection = require('../connection')
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole')




router.post('/add',auth.authenticationToken,checkRole.checkRole,(req,res,next)=>{
     let category = req.body;
     query = "insert into category (name) values(?)";
     connection.query(query,[category.name],(err,result)=>{
        if(!err){
            return res.status(200).json({message:"Category is added"})
        }
        else{
            return res.status(500).json(500);
        }
     })
})

router.get('/get',(req,res)=>{
    var query = "select * from category order by name";
    connection.query(query,(err,result)=>{
        if(!err){
            return res.status(200).json(result);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.patch('/update',auth.authenticationToken,checkRole.checkRole,(req,res,next)=>{
    let product = req.body;
    var query = "update category set name=? where id=?";
    connection.query(query,[product.name,product.id],(err,result)=>{
        if(!err){
            if(result.affectedRows==0)
            {
                return res.status(404).json({message:"category id does not found"})
            }
            return res.status(200).json({message:"Category is successfully updated"})
        }
    })
})

module.exports = router;