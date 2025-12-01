const express=require("express");
const router=express.Router();
const passport= require('passport')
const {ensureAuthenticated, ensureManager, ensureSalesExecutive} = require("../customMiddleware/auth");

const Registration=require('../models/Registration')
const woodsale=require('../models/wood_sale')
const furnitureStock=require('../models/furniture_stock')
const furnitureSale=require('../models/furniture_sale');
const WoodStock = require("../models/wood_stock");
const Order=require("../models/order")

router.get('/register', (req, res) => {
    res.render('signup')//rendering signup.pug file
});

//signup route
router.post('/register', async(req,res)=>{
    try {
     const newUser= new Registration(req.body)
    console.log(newUser);
    let user= await Registration.findOne({
        email: req.body.email
    })
    if(user){
        return res.status(400).send('Not registered, user already exists.')
    }else{
        await Registration.register(newUser, req.body.password, (error)=>{
    if (error){
        throw error;
    }
});
res.redirect('/');
    }
    } catch (error) {
    console.error(error.message)
    res.status(400).send('something went wrong');    
    }
});

//login route
router.get('/login',(req,res)=>{
    res.render('login')
})
router.post('/login', passport.authenticate('local',{failureRedirect:'/login'}), (req,res)=>{
req.session.user=req.user
if(req.user.role==='manager'){
    res.redirect('/viewboard')

}else if(req.user.role==='salesexecutive'){
res.redirect('/viewsales')
}else{
    res.render('nonuser')
}
});

//logout route
router.get('/logout',(req,res)=>{
    if(req.session){
        req.session.destroy((error)=>{
            if(error){
                return res.status(500).send('Error logging out!')
            }
            res.redirect('/');
        })
    }
})

//get users from database route
router.get("/users", async(req,res)=>{
    try {
       const users = await Registration.find().sort({$natural:-1})
       res.render("usertable", {users}); 
    } catch (error) {
      console.log('error requiring information');  
      res.status(400).send("unable to get users from the DB!");
    }
});

 router.get('/viewboard', async (req,res)=>{
    try {
      //expenses for buying wood stock  
      let totalHardwood = await WoodStock.aggregate([
        {$match:{woodType:'hardwood'}},
        {$group:{_id:null,
           totalquantity:{$sum:'$quantity'},
           totalcost:{$sum:{$multiply:['$unitprice','$quantity']}}
        }}
      ]) 
       let totalSoftwood = await WoodStock.aggregate([
        {$match:{woodType:'softwood'}},
        {$group:{_id:null,
           totalquantity:{$sum:'$quantity'},
           totalcost:{$sum:{$multiply:['$unitprice','$quantity']}}
        }}
      ]) 
       let totalTimber = await WoodStock.aggregate([
        {$match:{woodType:'timber'}},
        {$group:{_id:null,
           totalquantity:{$sum:'$quantity'},
           totalcost:{$sum:{$multiply:['$unitprice','$quantity']}}
        }}
      ]) 
       let totalPoles = await WoodStock.aggregate([
        {$match:{woodType:'poles'}},
        {$group:{_id:null,
           totalquantity:{$sum:'$quantity'},
           totalcost:{$sum:{$multiply:['$unitprice','$quantity']}}
        }}
      ]) 
    totalHardwood = totalHardwood[0]??{totalquantity:0, totalcost:0}
    totalSoftwood = totalSoftwood[0]??{totalquantity:0, totalcost:0}
    totalTimber = totalTimber[0]??{totalquantity:0, totalcost:0}
    totalPoles = totalPoles[0]??{totalquantity:0, totalcost:0}
    

      //get all sales
const woodsales = await woodsale.find().populate('salesAgent', 'fullname');
const furnitureSales = await furnitureSale.find().populate('salesAgent', 'fullname');

const totalSales = woodsales.length + furnitureSales.length;

//get all stock
const furnitureStocks = await furnitureStock.find();
const woodstocks = await WoodStock.find();

//calculate revenue (prevent NaN)
const woodRevenue = woodsales.reduce((sum, sale) => {
  return sum + (Number(sale.totalprice) || 0);
}, 0);

const furnitureRevenue = furnitureSales.reduce((sum, sale) => {
  return sum + (Number(sale.totalprice) || 0);
}, 0);

const totalRevenue = woodRevenue + furnitureRevenue;

//calculate expenses (prevent NaN)
const woodExpenses = woodstocks.reduce((sum, stock) => {
  return sum + ((Number(stock.unitprice) || 0) * (Number(stock.quantity) || 0));
}, 0);

//calculate profit
const grossProfit = totalRevenue - woodExpenses;

//Low stock alerts
const lowWoodstock = woodstocks.filter(stock => Number(stock.quantity) < 10);
const lowFurniturestock = furnitureStocks.filter(stock => Number(stock.quantity) < 10);

    res.render("managerDashboard",{
        totalHardwood,
        totalSoftwood,
        totalTimber,
        totalPoles,
        woodExpenses,
        grossProfit,
        furnitureStocks,
        totalSales,
        lowWoodstock,
        lowFurniturestock,
        totalRevenue,
        woodsales,
        furnitureSales,
        furnitureRevenue
    });
      
        } catch (error) {

        }
 });

 //SALES 
router.get("/viewsales", async (req, res) => {
    try {
        // --- 1. Fetch Orders Data ---
        const orders = await Order.find().sort({ createdAt: -1 });

        // --- 2. Fetch Aggregated Wood Stock Data ---
        const aggregatedStock = await WoodStock.aggregate([
            {
                $group: {
                    _id: '$woodType',
                    totalQuantity: { $sum: '$quantity' }
                }
            }
        ]);

        // --- 3. Format Chart Data ---
        const categories = ['softwood', 'hardwood', 'poles', 'timber'];
        
        const woodChartData = {
            labels: categories.map(c => c.charAt(0).toUpperCase() + c.slice(1)), 
            quantities: categories.map(category => {
                const result = aggregatedStock.find(item => item._id === category);
                return result ? result.totalQuantity : 0;
            })
        };

        // --- 4. Render Final Response ---
        // Combine all necessary data into a single object for the view.
        res.render("salesDashboard", {
            orders: orders,            // For the Recent Orders table
            woodChartData: woodChartData, // For the bar graph
            currentUser: req.user      // For the "Welcome, [Name]" display
        });

    } catch (err) {
        // Ensure you return here to prevent further execution
        console.error("Error fetching dashboard data:", err);
        return res.status(500).send("Failed to load dashboard data.");
    }
});
   

router.get("/viewsales", async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.redirect('/login'); // Redirect if not logged in
        }
        const agentId = req.user._id;

        // --- 1. Fetch Agent's Sales Records ---
        // Find sales where the agentId matches the logged-in user's ID
        const sales = await SaleRecord.find({ agentId: agentId })
            .sort({ date: -1 })
            .limit(20); // Limit to recent sales for performance

        // --- 2. Fetch Orders Data ---
        const orders = await Order.find().sort({ createdAt: -1 });

        // --- 3. Fetch and Format Wood Stock Data (Aggregation) ---
        const aggregatedStock = await WoodStock.aggregate([
            { $group: { _id: '$woodType', totalQuantity: { $sum: '$quantity' } } }
        ]);

        const categories = ['softwood', 'hardwood', 'poles', 'timber'];
        const woodChartData = {
            labels: categories.map(c => c.charAt(0).toUpperCase() + c.slice(1)), 
            quantities: categories.map(category => {
                const result = aggregatedStock.find(item => item._id === category);
                return result ? result.totalQuantity : 0;
            })
        };

        // --- 4. Render Final Response ---
        res.render("salesDashboard", {
            // New Data Point for the Sales Records Table
            sales: sales,             
            // Existing Data Points
            orders: orders,            
            woodChartData: woodChartData, 
            currentUser: req.user      
        });

    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return res.status(500).send("Failed to load dashboard data.");
    }
});
//    } catch (err) {
//      console.log(err.message);
//      res.status(500).send("Failed to load dashboard");
//    }
//  });
module.exports=router;

