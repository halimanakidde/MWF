const express=require("express");
const router=express.Router();
const {ensureAuthenticated, ensureManager, ensureSalesExecutive} = require("../customMiddleware/auth");

const furnitureStock = require('../models/furniture_stock')
const woodStock = require('../models/wood_stock');
const woodSale = require("../models/wood_sale");
const furnitureSale = require('../models/furniture_sale')


 //route for sales form

 router.get("/recordwoodSale", async (req,res)=>{
    try {
        const wooditems = await woodStock.find();
        res.render("wood_sales", {wooditems});

    } catch (error) {
       console.log(error.message) 
    }
 });

 router.post("/recordwoodSale", async(req,res)=>{
   try {
     const {customerName,productName,quantity,unitprice,date,paymentType,transportprovided}= req.body;
     //find all wood stockwith wood name
     const stocks= await woodStock.find({woodName: productName})
     if(!stocks || stocks.length === 0)
      return res.status(400).send("Stock not found");
   //calculate total available quantity across all stock entities
   const totalAvailable = stocks.reduce((sum,stock) => sum + stock.quantity,0)
   if (totalAvailable < Number(quantity))
      return res.status(400).send("insufficient stock")
    //calculate total price
    let total = unitprice * Number(quantity)
    if(transportprovided ==='Yes')
      total *=1.05;
   const sale= new woodSale({
    customerName,
    productName,
    quantity,
    unitprice,
    date,
    paymentType,
    transportprovided:!!transportprovided,
    salesAgent:req.user ? req.user._id : null,
    totalprice:total 
   })
   await sale.save();
   //deduct quantity sold from the stock
   let remainingToDeduct=Number(quantity)
    for(const stock of stocks){
      if(remainingToDeduct <= 0) break;
      const deductFromThis = Math.min(stock.quantity, remainingToDeduct)
      stock.quantity -=deductFromThis
      remainingToDeduct -=deductFromThis
      await stock.save();
    }
     res.redirect("/recordwoodSale")
   } catch (error) {
      res.status(400).send('Unable to add item in the database')
      console.log(error);
   }
 });


 


module.exports=router;
