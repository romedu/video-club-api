const {Movie} = require("../models"),
      {createError} = require("../helpers/error");

exports.checkIfAvailable = async (req, res, next) => {
   req.baseMovie = await Movie.findOne({imdbID: req.body.imdbID});
   const {baseMovie} = req;
   if(!baseMovie) return next(createError(404, "Not Found"));
   if(baseMovie.availableForRent === 0) return next(createError(409, "There aren't copies available for rent left"));
   next();
}

module.exports = exports;