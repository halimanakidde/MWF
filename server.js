// //1. dependencies
// const express = require('express');//importing dependency
// const path = require('path');//importing path module
// const mongoose = require ('mongoose');
// const passport = require('passport');/*  PASSPORT SETUP  */
// const flash = require('connect-flash');
// const session = require('express-session')({
//     secret:"my secret",
//     resave: false,
//     saveUninitialized: false,
// });
// require('dotenv').config();

// //import registration model
// const Registration=require('./models/Registration')

// //import routes
// const indexRoutes=require('./routes/index_Routes');
// const stockRoutes=require('./routes/stock_Routes');
// const authRoutes=require('./routes/auth_Routes');
// const salesRoutes=require('./routes/sales_Routes');
// const messagesRoutes=require('./routes/messages_Routes');
// const reportRoutes=require('./routes/report_Routes');



// //2. instantiations
// const app=express();//creating an express application
// const port=3000;

// app.use(passport.initialize());
// app.use(passport.session());

// //3. configurations

// //setting up database connection
// mongoose.connect(process.env.MONGO_URI);
// mongoose.connection
//     .once('open', ()=>{
//         console.log('mongoose connection open');
//     })
//     .on('error', (error)=>{
//         console.error(`connection error: ${error.message}`)
//     });

//     //set view engine to pug
// app.set('view engine', 'pug');//setting pug as the view engine
// app.set('views', path.join(__dirname, 'views',));//specifying views directory

// //4. middleware
// app.use(express.urlencoded({extended: true}));//middleware to parse urlencoded request bodies 
// app.use(express.static(path.join(__dirname, "public")));
// app.use('/public/images/uploads', express.static(__dirname + '/public/images/uploads'));

// app.use(flash());
// app.use((req, res, next) => {
//     res.locals.success_msg = req.flash('success');
//     res.locals.error_msg = req.flash('error');
//     // Add any other types you use (e.g., 'warning', 'info')
//     next();
// });



// //passport configurations
// passport.use(Registration.createStrategy());
// passport.serializeUser(Registration.serializeUser());
// passport.deserializeUser(Registration.deserializeUser());

// //5. routes
// app.use('/', indexRoutes);//using imported route
// app.use('/', stockRoutes);// always use full route path
// app.use('/', authRoutes);
// app.use('/', salesRoutes);
// app.use('/', messagesRoutes);
// app.use('/', reportRoutes);


//  //non existing routes
// app .use((req,res)=>{//middleware to handle non-existing routes
//      res.status(404).send("Oops! route Not Found!");//sending 404 response
//  });

//  //6. bootstrapping the server 
// app.listen(port ,()=>console.log(`listening on port ${port}`));//server is listening on port 3000   




//1. dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
require('dotenv').config();

//import registration model
const Registration = require('./models/Registration');

//import routes
const indexRoutes = require('./routes/index_Routes');
const stockRoutes = require('./routes/stock_Routes');
const authRoutes = require('./routes/auth_Routes');
const salesRoutes = require('./routes/sales_Routes');
const messagesRoutes = require('./routes/messages_Routes');
const reportRoutes = require('./routes/report_Routes');

//2. instantiations
const app = express();
const port = 3000;

// -------------------------
// ❗ FIX: SESSION MUST COME FIRST
// -------------------------
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
  })
);

// -------------------------
// THEN Passport
// -------------------------
app.use(passport.initialize());
app.use(passport.session());

//3. configurations
mongoose.connect(process.env.MONGO_URI);
mongoose.connection
  .once('open', () => console.log('mongoose connection open'))
  .on('error', (error) => console.error(`connection error: ${error.message}`));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//4. middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/images/uploads', express.static(__dirname + '/public/images/uploads'));

app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');
  next();
});

//passport configurations
passport.use(Registration.createStrategy());
passport.serializeUser(Registration.serializeUser());
passport.deserializeUser(Registration.deserializeUser());

//5. routes
app.use('/', indexRoutes);
app.use('/', stockRoutes);
app.use('/', authRoutes);
app.use('/', salesRoutes);
app.use('/', messagesRoutes);
app.use('/', reportRoutes);

//6. 404 handler
app.use((req, res) => {
  res.status(404).send("Oops! route Not Found!");
});

//7. start server
app.listen(port, () => console.log(`listening on port ${port}`));
