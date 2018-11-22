const axios = require("axios"), 
      {createError} = require("./error");

exports.searchMovies = (req, res, next) => {
    const {title, year} = req.body,
          searchQuery = year && (year < new Date.getFullYear()) ? `s=${title}&y=${year}` : `s=${title}`;

    axios.get(`http://www.omdbapi.com/?apikey=thewdb&${searchQuery}`)
      .then(response => response.data.Search)
      .then(movieList => res.status(200).json(movieList))
      .catch(error => {
         error = createError(404, "Not Found");
         return next(error);
      })
};

exports.searchMovieById = (req, res, next) => {
   const {imdbID} = req.body;
   if(!imdbID) return next(createError(404, "Not Found"));
   axios.get(`http://www.omdbapi.com/?apikey=thewdb&i=${imdbID}&plot=full`)
      .then(response => response.data)
      .then(movie => res.status(200).json(movie))
      .catch(error => {
         error = createError(404, "Not Found");
         return next(error);
      })
};

module.exports = exports;