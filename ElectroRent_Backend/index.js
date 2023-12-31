const express = require('express')
const cors = require('cors')
const connection = require('./connection')
const userRoute = require('./routes/user')
const categoryRoute = require('./routes/category')
const productRoute = require('./routes/product')
const billRoute = require('./routes/bill')
const cartRoute = require('./routes/cart')

const dashboardRoute = require('./routes/dashboard')
const cookieParser = require('cookie-parser')
const app = express();

app.use(cors({
    credentials:true,
    origin:['http://localhost:4200']
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use("/user",userRoute);
app.use("/category",categoryRoute);
app.use("/product",productRoute);
app.use("/bill",billRoute);
app.use("/dashboard",dashboardRoute)
app.use("/add",cartRoute)


module.exports = app;