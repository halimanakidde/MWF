const express=require("express");
const router=express.Router();
const {ensureAuthenticated, ensureManager, ensureSalesExecutive} = require("../customMiddleware/auth");

const furnitureStock = require('../models/furniture_stock')
const woodStock = require('../models/wood_stock');
const woodSale = require("../models/wood_sale");
const furnitureSale = require('../models/furniture_sale')
const Registration = require("../models/Registration");
const Order=require("../models/order")



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
// router.get("/salesReport", async (req, res) => {
//   try {
//     const sales = await woodSale.find().sort({ createdAt: -1 });
    

//      const totalRevenue = sales.reduce((sum, s) => {
//       return sum + Number(s.totalprice || 0);
//     }, 0);

//     const totalSales = sales.reduce((sum, s) => {
//       return sum + Number(s.quantity || 0);
//     }, 0);

//     res.render("sales_report", {
//       sales,
//       totalRevenue,
//       totalSales
//     });

//   } catch (error) {
//     console.log("SALES REPORT ERROR:", error.message);
//     res.status(500).send("Could not generate sales report");
//   }
// });


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

 // Route that displays furniture and wood sales
router.get("/salesReport", async (req, res) => {
  try {
    // 1. Fetch sales from both models concurrently
    const [furnitureSales, woodSales] = await Promise.all([
      furnitureSale.find(),
      woodSale.find(),
    ]);

    // 2. Combine the sales records
    // Use the spread operator to merge the two arrays
    let allSales = [...furnitureSales, ...woodSales];
    
    // 3. Sort the combined list by creation date (descending)
    allSales.sort((a, b) => b.createdAt - a.createdAt);

    // 4. Recalculate Totals using the combined list
    const totalRevenue = allSales.reduce((sum, s) => {
      // Ensure totalprice is a number before summing
      return sum + Number(s.totalprice || 0);
    }, 0);

    const totalSales = allSales.reduce((sum, s) => {
      // Ensure quantity is a number before summing
      return sum + Number(s.quantity || 0);
    }, 0);

    res.render("sales_report", {
      sales: allSales, // Pass the combined and sorted list
      totalRevenue,
      totalSales
    });

  } catch (error) {
    console.log("SALES REPORT ERROR:", error.message);
    res.status(500).send("Could not generate sales report");
  }
});

//route for rendering gallery page
router.get("/gallery", async (req, res) => {
  try {
    const furnitureList = await furnitureStock.find();  
    res.render("gallery", { furnitureList });
  } catch (err) {
    console.log(err.message);
  }
});

// Order Page
router.get("/order", async (req, res) => {
  try {
    const item = await furnitureStock.findById(req.params.id);
    res.render("order_form", { item });
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/order", async (req, res) => {
  try {
    const { productName, quantity, customerName, phone, notes } = req.body;

    await Order.create({
      productName,
      quantity,
      customerName,
      phone,
      notes
    });

    res.render("order_success", { customerName });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Failed to submit order");
  }
});



//loads the orders and sends them to the dashboard page
// router.get("/viewsales", async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });

//     res.render("salesDashboard", { orders });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send("Failed to load dashboard");
//   }
// });



module.exports=router;
