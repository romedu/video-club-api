const {RentedMovie} = require("../models"),
      {createError} = require("./error");

exports.find = (req, res, next) => {
   RentedMovie.find({})
      .then(rentedMovies => {
         if(!rentedMovies) throw createError(404, "Not Found");
         return res.status(200).json(rentedMovies);
      })
      .catch(error => next(error));
};

exports.create = (req, res, next) => {
   const {body, user} = req;
   body.rentedBy = user._id;
   
   RentedMovie.create(body)
      .then(newRentedMovie => {
         const {baseMovie} = req;
         user.rentedMovies.push(newRentedMovie._id);
         user.debt += newRentedMovie.price;
         baseMovie.availableForRent--;
         return Promise.all([newRentedMovie, user.save(), baseMovie.save()]);
      })
      .then(data => res.status(201).json(data[0]))
      .catch(error => {
         if(!error.status) error.status = 400;
         next(error);
      });
}

//THE RENTEDBY PROPERTY RETURNS WITHOUT THE USERNAME AND PASSWORD
exports.findOne = (req, res, next) => {
   RentedMovie.findById(req.params.id).populate("rentedBy").exec()
      .then(rentedMovie => {
         if(!rentedMovie) throw createError(404, "Not Found");
         const {username, password, ...passwordlessUser} = rentedMovie.rentedBy._doc;
         rentedMovie.rentedBy = passwordlessUser;
         return res.status(200).json(rentedMovie);
      })
      .catch(error => next(error));
}

exports.update = (req, res, next) => {
   //FOR THE TIME BEING THE PRICE AND THE RENTEDBY PROPERTIES CAN'T BE UPDATED
   const {price, rentedBy, ...body} = req.body;
   
   RentedMovie.findByIdAndUpdate(req.params.id, body, {new: true})
      .then(editedRentedMovie => res.status(200).json(editedRentedMovie))
      .catch(error => {
         error.status = 409; 
         return next(error);
      });
}

exports.delete = (req, res, next) => {
   RentedMovie.findByIdAndRemove(req.params.id)
      .then(exRentedMovie => {
         const {user, baseMovie} = req;
         user.rentedMovies.pull(req.params.id);
         user.debt -= exRentedMovie.price;
         baseMovie.availableForRent++;
         return Promise.all([exRentedMovie, user.save(), baseMovie.save()]);
      })
      .then(data => res.status(200).json(data[0]))
      .catch(error => next(error));
}

module.exports = exports;