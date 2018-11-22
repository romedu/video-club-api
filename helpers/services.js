const axios = require("axios"), 
      {createError} = require("./error");

exports.searchMovies = async (req, res, next) => {
    const {title, year} = req.body,
          searchQuery = year && (year < new Date.getFullYear()) ? `?s=${title}&y=${year}` : `?s=${title}`,
          movieList = await axios.get(`http://www.omdbapi.com/?apikey=thewdb&${searchQuery}`).Search;
    
    if(!movieList) return next(createError(404, "Not Found"));
    return res.status(200).json({movieList});
};

module.exports = exports;