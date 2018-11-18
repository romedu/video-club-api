const DB = require('../models'),
      jwt = require('jsonwebtoken'),
      {createError} = require("./error");

const createToken = userData => {
   const {SECRET_KEY} = process.env,
         token = jwt.sign(userData, SECRET_KEY, {expiresIn: 60 * 60});
   
   return token;      
};

exports.login = async function(req, res, next){
   try {
      const {username} = req.body; 
      const user = await DB.User.findOne({username});
      const {password, ...userData} = user._doc;
      const isMatch = await user.comparePassword(req.body.password);
    
      if(isMatch){
         const token = createToken(userData);
         userData.token = token;
         return res.status(200).json(userData);
      } 
      else {
         const error = createError(400, "Invalid Username/Password");
         return next(error);
      }
  }
  catch (error){
      error = createError(400, "Invalid Username/Password");
      return next(error);
  }
};

exports.register = async function(req, res, next){
   try {
      const user = await DB.User.create(req.body),
            {password, ...userData} = user._doc,
            token = createToken(userData);
            userData.token = token;
            
      return res.status(201).json(userData);
   }
   catch (error){
      if(error.code === 11000){
         error.message = "Sorry, that username is unavailable";
      }
      
      error = createError(409, error.message);
      return next(error);
   }
};

exports.verifyToken = (req, res) => {
   const {user} = req;
   res.status(200).json(user);
};

module.exports = exports;