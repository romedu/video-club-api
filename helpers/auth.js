const DB = require('../models'),
      jwt = require('jsonwebtoken'),
      {createError} = require("./error"),
      {calculateDebt} = require("./index");

const processUserData = ({_id, username, isAdmin, debt, rentedMovies}) => {
   const {SECRET_KEY} = process.env,
         userData = {
            _id,
            username,
            isAdmin,
            debt: calculateDebt(debt, rentedMovies)
         },
         token = jwt.sign(userData, SECRET_KEY, {expiresIn: 60 * 60});
   
   return {userData, token};      
};

exports.login = async function(req, res, next){
   try {
      const {username} = req.body; 
      const user = await DB.User.findOne({username}).populate("rentedMovies").exec();
      const isMatch = await user.comparePassword(req.body.password);
    
      if(isMatch){
         const processedUser = processUserData(user._doc);
         return res.status(200).json(processedUser);
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
            processedUser = processUserData(user._doc);

      return res.status(201).json(processedUser);
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
   return res.status(200).json(user);
};

module.exports = exports;