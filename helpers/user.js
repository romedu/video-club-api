const {User} = require("../models"),
      {createError} = require("./error");

//ALL THE USERS RETURNS WITHOUT THEIR USERNAME AND PASSWORD

exports.find = (req, res, next) => {
   User.find({}).populate("rentedMovies").exec()
      .then(users => {
         if(!users) throw createError(404, "Not Found");
         const passwordlessUsers = users.map(user => {
            const {username, password, ...userData} = user._doc;
            return userData;
         });
         return res.status(200).json(passwordlessUsers);
      })
      .catch(error => next(error));
};

exports.findOne = (req, res, next) => {
   User.findById(req.params.id).populate("rentedMovies").exec()
      .then(user => {
         if(!user) throw createError(404, "Not Found");
         const {username, password, ...userData} = user._doc;
         return res.status(200).json(userData)
      })
      .catch(error => next(error));
};

//THE USERNAME AND THE PASSWORD CAN'T BE CHANGED
exports.update = (req, res, next) => {
   const {username, password, ...body} = req.body;
   User.findByIdAndUpdate(req.params.id, body, {new: true})
      .then(user => {
         const {username, password, ...passwordlessUser} = user._doc;
         return res.status(200).json(passwordlessUser);
      })
      .catch(error => {
         error.status = 409;
         next(error);
      })
}

exports.delete = (req, res, next) => {
   User.findByIdAndRemove(req.params.id)
      .then(exUser => res.status(200).json({message: "User removed successfully"}))
      .catch(error => next(error));
};

module.exports = exports;