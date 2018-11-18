const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/video-club", {useNewUrlParser: true});
mongoose.Promise = Promise;

exports.User = require("./user");
exports.Movie = require("./movie");
exports.RentedMovie = require("./rentedMovie");

module.exports = exports;