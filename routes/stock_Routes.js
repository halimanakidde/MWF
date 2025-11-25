const express=require("express");
const router=express.Router();
//const connectEnsureLogin = require('connect-ensure-login');
const multer = require('multer');
const {ensureAuthenticated, ensureManager, ensureSalesExecutive} = require("../customMiddleware/auth");

const furnitureStock = require('../models/furniture_stock')
const woodStock = require('../models/wood_stock');

// image configs
var storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) =>{
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

//furniture registration route
router.get('/furnitureRegistration', (req, res)=>{
    res.render('furniture_reg')
});

router.post('/furnitureRegistration',upload.single("furnitureimage"), async(req, res)=>{
    try {
        const furniture = new furnitureStock(req.body);
        furniture.furnitureimage = req.file.path
        console.log(furniture);
    await furniture.save();
        res.redirect('/viewboard');
    } catch (error) {
        console.error(error);
       res.redirect('/furnitureRegistration');
    }
});

// wood registration route
router.get('/woodRegistration', (req, res)=>{
    res.render('wood_reg')
});

router.post('/woodRegistration',async (req, res)=>{
try {
    const wood= new woodStock(req.body)
console.log(wood);
await wood.save()
res.redirect('/viewboard');//redirect to a route path not to a file    
} catch (error) {
 res.redirect('/woodRegistration');   
}
 });   

 // route for getting furniture registered from the database
 router.get('/furnitureRegistered', async(req,res)=>{
    try {
        const Furniture=await furnitureStock.find();
        res.render('furniture_table', {Furniture});
    } catch (error) {
       console.error('error getting furniture from the database!') 
    //    res.redirect('/')
    }
 });

 //route for updating furniture/ get furniture stock to update
 router.get('/furniture/:id', async(req,res)=>{
    try {
        const furnitureUpdate = await furnitureStock.findOne({_id:req.params.id});
        res.render('furniture_Update', {item:furnitureUpdate})
    } catch (error) {
      res.status(400).send('Unable to find item in the database')
      console.log(error);  
    }
 });

 //route for updating furniture/ get furniture stock to update
 router.post('/furniture/:id', async(req,res)=>{
    try {
        await furnitureStock.findByIdAndUpdate({_id:req.params.id}, req.body);
        res.redirect('/furnitureRegistered')
    } catch (error) {
      res.status(400).send('Unable to update furniture in the database')
      console.log(error);  
    }
 });

 //route for deleting furniture 
 router.post('/deletefurniture/:id', async(req,res)=>{
    try {
        await furnitureStock.deleteOne({_id:req.params.id}, req.body);
        res.redirect('/furnitureRegistered')
    } catch (error) {
      res.status(400).send('Unable to delete furniture from the database')
      console.log(error);  
    }
 });

 //route for getting wood registered from the database
 router.get('/woodRegistered', async(req,res)=>{
    try {
        const wood=await woodStock.find();
        res.render('wood_table', {wood})
    } catch (error) {
       console.error('error getting wood stock from the database!') 
       res.redirect('/woodRegistered')
    }
 });

 


 


module.exports=router;
