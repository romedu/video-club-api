const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.connect(process.env.DBURL, {useNewUrlParser: true});
mongoose.Promise = Promise;

exports.User = require("./user");
exports.Movie = require("./movie");
exports.RentedMovie = require("./rentedMovie");

module.exports = exports;