const mongoose = require("mongoose"),
      {DBURL} = process.env;

mongoose.set("debug", true);
mongoose.connect(DBURL, {useNewUrlParser: true});
mongoose.Promise = Promise;

exports.User = require("./user");
exports.Movie = require("./movie");
exports.RentedMovie = require("./rentedMovie");

module.exports = exports;