//ensure user is authenticated
exports.ensureAuthenticated = (req,res,next)=>{
    if(req.session.user){
        return next()
    }
    res.redirect('/login')
}

//ensure user is a manager
exports.ensureManager = (req,res,next) => {
    if(req.session.user && req.session.user.role==="manager"){
        return next();
    }
    res.redirect("/");
}

//Ensure user is a sales agent
exports.ensureSalesExecutive = (req,res,next) => {
    if(req.session.user && req.session.user.role==="salesexecutive"){
        return next();
    }
    res.redirect("/");
}