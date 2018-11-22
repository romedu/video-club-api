const mongoose = require("mongoose"),
      validators = require("../helpers/validators"),
      rentedMovieSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        imdbID: {
           type: String, 
           required: true,
           unique: true
        },
        image: String,
        released: String,
        directedBy: String,
        actors: String,
        plot: String,
        price: {
            type: Number,
            required: true
        },
        rentedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        rentedDays: {
            type: Number,
            validate: {
               validator: validators.aWeekOrLess,
               message: "You can't have it rented for more than a week"
            }
        }
      }, {timestamps: {createdAt: 'rentedAt'}});
      
module.exports = mongoose.model("RentedMovie", rentedMovieSchema);      