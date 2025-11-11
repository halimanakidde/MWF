const express=require("express");
const router=express.Router();

router.get('/', (req, res) => {
    res.render('index')//rendering home.pug file
});



//last line
module.exports=router;
//always import your route file into the server file


