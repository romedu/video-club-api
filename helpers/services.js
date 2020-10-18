const axios = require("axios"), 
      {createError} = require("./error");
const { response } = require("express");

exports.searchMovies = (req, res, next) => {
    const {title, year} = req.body,
          searchQuery = year && (year < new Date().getFullYear()) ? `s=${title}&y=${year}` : `s=${title}`;

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

exports.searchManyMovies = (req, res, next) => {
   const {body} = req; 
   let moviesId = typeof body.moviesId === "string" ? body.moviesId.split(",") : [];
   let moviesFetchReqs = moviesId.map(movieId => axios.get(`http://www.omdbapi.com/?apikey=thewdb&i=${movieId}&plot=full`));

   Promise.all(moviesFetchReqs)
      .then(responses => responses.map(({data}) => data))
      .then(movies => {
         res.status(200).json(movies)
      })
      .catch(error => {
         error = createError(404, "Not Found");
         return next(error);
      })
};

module.exports = exports;