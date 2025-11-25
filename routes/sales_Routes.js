const express=require("express");
const router=express.Router();
const {ensureAuthenticated, ensureManager, ensureSalesExecutive} = require("../customMiddleware/auth");

const furnitureStock = require('../models/furniture_stock')
const woodStock = require('../models/wood_stock');
const woodSale = require("../models/wood_sale");
const furnitureSale = require('../models/furniture_sale')
const Registration = require("../models/Registration");



 //route for getting sales form

router.get("/recordwoodSale", async (req, res) => {
  try {
    const wooditems = await woodStock.find();

    // Get all registered sales agents
    const agents = await Registration.find({}, "fullname");

    res.render("wood_sales", {
      wooditems,
      agents
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error loading wood sale form");
  }
});


//  Record Wood Sale

router.post("/recordwoodSale", async (req, res) => {
  try {
    const {
      customerName,
      productType,
      productName,
      quantity,
      quality,
      unitprice,
      date,
      paymentType,
      transportprovided,
      notes,
      salesAgent
    } = req.body;

    //  Validate required fields
    if (!customerName || !productName || !quantity || !unitprice || !date) {
      return res.status(400).send("Missing required fields");
    }

    //  Find stock(s) with that productName
    const stocks = await woodStock.find({ woodName: productName });

    if (!stocks || stocks.length === 0) {
      return res.status(400).send("Stock not found");
    }

    // Check available quantity
    const totalAvailable = stocks.reduce((sum, stock) => {
      return sum + Number(stock.quantity || 0);
    }, 0);

    if (totalAvailable < Number(quantity)) {
      return res.status(400).send("Insufficient stock");
    }

    // 4. Calculate total price
    let total = Number(unitprice) * Number(quantity);

    // Add 5% if transport provided
    if (transportprovided === "Yes") {
      total = total * 1.05;
    }

    // 5. Create sale record
    const sale = new woodSale({
      customerName,
      productType,
      productName,
      quantity: Number(quantity),
      quality,
      unitprice: Number(unitprice),
      date,
      paymentType,
      transportprovided,
      salesAgent: salesAgent || null, // comes from the dropdown
      totalprice: total,
      notes
    });

    await sale.save();

    // 6. Deduct quantity from stock
    let remainingToDeduct = Number(quantity);

    for (const stock of stocks) {
      if (remainingToDeduct <= 0) break;

      const deductFromThis = Math.min(stock.quantity, remainingToDeduct);
      stock.quantity -= deductFromThis;
      remainingToDeduct -= deductFromThis;

      await stock.save();
    }

    res.redirect("/recordwoodSale");
  } catch (error) {
    console.log(error);
    res.status(500).send("Unable to save wood sale");
  }
});

 //route for furniture sales
router.get("/recordfurnitureSale", async (req,res)=>{
    try {
        const furnitureitems = await furnitureStock.find();

        // Get all registered sales agents
    const agents = await Registration.find({}, "fullname");

    res.render("furniture_sales", {
      furnitureitems,
      agents
    });
        // res.render("furniture_sales", {furnitureitems});

    } catch (error) {
       console.log(error.message) 
    }
 });

 
 router.post("/recordfurnitureSale", async(req,res)=>{
  req.session.user = req.user
   try {
     const {
      customerName,
      productType,
      productName,
      quantity,
      unitprice,
      date,
      paymentType,
      transportprovided,
      totalprice
    }= req.body;
     //find all wood stockwith wood name
     const stocks= await furnitureStock.find({furniturename: productName})
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
    const sale = new furnitureSale({
    customerName,
    productType,
    productName,
    quantity,
    unitprice,
    date,
    paymentType,
    transportprovided:!!transportprovided,
    salesAgent:req.user ? req.user._id : null,
    totalprice: total 
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
     res.redirect("/recordfurnitureSale")
   } catch (error) {
      res.status(400).send('Unable to add item in the database')
      console.log(error);
   }
 });

router.get("/salesReport", async (req, res) => {
  try {
    const sales = await furnitureSale.find().sort({ createdAt: -1 });

     const totalRevenue = sales.reduce((sum, s) => {
      return sum + Number(s.totalprice || 0);
    }, 0);

    const totalSales = sales.reduce((sum, s) => {
      return sum + Number(s.quantity || 0);
    }, 0);

    res.render("sales_report", {
      sales,
      totalRevenue,
      totalSales
    });

  } catch (error) {
    console.log("SALES REPORT ERROR:", error.message);
    res.status(500).send("Could not generate sales report");
  }
});


 


module.exports=router;
