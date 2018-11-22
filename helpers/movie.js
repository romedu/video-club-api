const {Movie} = require("../models"),
      {createError} = require("./error");

exports.find = (req, res, next) => {
   Movie.find({})
      .then(movies => {
         if(!movies) throw createError(404, "Not Found");
         return res.status(200).json(movies);
      })
      .catch(error => next(error));
};

exports.create = (req, res, next) => {
   const {body} = req;   
   Movie.create(body)
      .then(newMovie => res.status(201).json(newMovie))
      .catch(error => {
         if(!error.status) error.status = 400;
         next(error);
      });
}

exports.findOne = (req, res, next) => {
   Movie.findById(req.params.id)
      .then(movie => {
         if(!movie) throw createError(404, "Not Found");
         return res.status(200).json(movie);
      })
      .catch(error => next(error));
}

exports.update = (req, res, next) => {
   Movie.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(editedMovie => res.status(200).json(editedMovie))
      .catch(error => {
         error.status = 409; 
         return next(error);
      });
}

exports.delete = (req, res, next) => {
   Movie.findByIdAndRemove(req.parms.id)
      .then(exMovie => res.status(200).json(exMovie))
      .catch(error => next(error));
}

module.exports = exports;