const mongoose = require("mongoose"),
      movieSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        imdbID:{
           type: String,
           required: true,
           unique: true
        },
        image: String,
        released: String,
        directedBy: String,
        actors: String,
        plot: String,
        distributedBy: String,
        price: {
            type: Number,
            required: true
        },
        availableForRent: {
           type: Number,
           default: 1
        }
      });
      
module.exports = mongoose.model("Movie", movieSchema);      