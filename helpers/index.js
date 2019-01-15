const moment = require("moment");

exports.calculateDebt = (currentDebt, rentedMovies) => {
   const currentDate = moment(new Date());
   let interest = 0;

   rentedMovies.forEach(movie => {
      const movieReturnDate = moment(movie.rentedAt).add(movie.rentedDays, "days");
      if(movieReturnDate > currentDate) return;
      interest += Math.floor((currentDate - movieReturnDate) / 86400000);
   });
   return currentDebt + interest;
};

module.exports = exports;