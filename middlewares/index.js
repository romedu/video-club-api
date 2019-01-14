var jwt = require('jsonwebtoken'),
    {createError} = require("../helpers/error"),
    {User} = require("../models");

exports.checkAdminPassword = (req, res, next) => {
   const {ADMIN_KEY} = process.env,
         {body} = req;
   if(body.isAdmin && body.isAdmin !== "false"){
       if(body.adminPassword === ADMIN_KEY) return next();
       else {
           const error = createError(401, "Incorrect Admin's password");
           return next(error);
       }
   }
   return next();
};

exports.checkIfToken = (req, res, next) => {
   const {token} = req.query,
         {SECRET_KEY} = process.env;
   
   console.log(token);

   if(!token){
       const error = createError(400, "A valid token is required");
       return next(error);
   }
   
   return jwt.verify(token, SECRET_KEY, (error, decoded) => {
              if(error){
                 error = createError(400, "Invalid/Expired Token");
                 return next(error);
              }
              req.user = decoded;
              next(); 
          });
};

exports.checkIfAdmin = (req, res, next) => {
   if(req.user.isAdmin) return next();
   const error = createError(401, "Not authorized to proceed");
   return next(error);
};

exports.checkIfSameUser = (req, res, next) => {
   if(req.user.isAdmin || req.user._id === req.params.id) return next();
   const error = createError(401, "Not authorized to proceed");
   return next(error);
}

exports.getUser = (req, res, next) => {
   User.findById(req.user._id)
      .then(user => {
         if(!user) throw createError(404, "Not Found");
         req.user = user;
         return next();
      })
      .catch(error => next(error));
};

exports.sanitizeBody = (req, res, next) => {
   if(!req.body) next();
   
   for(const field in req.body){
       req.body[field] = typeof req.body[field] === "string" ? req.sanitize(req.body[field].trim()) : req.sanitize(req.body[field]);
   }
   return next();
};

module.exports = exports;