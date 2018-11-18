const mongoose   = require("mongoose"),
      bcrypt     = require("bcryptjs"),
      validators = require("../helpers/validators"),
      userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
           type: Boolean,
           default: false
        },
        name: {
            type: String,
            required: true,
            validate: {
               validator: validators.alphanumOnly,
               message: "Only alphanumeric and space characters are allowed"
            }
        },
        lastName: {
            type: String,
            required: true,
            validate: {
               validator: validators.alphanumOnly,
               message: "Only alphanumeric and space characters are allowed"
            }
        },
        address: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        rentedMovies: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "RentedMovie"
        }],
        debt: {
            type: Number,
            default: 0
        }
      });
      
userSchema.pre("save", async function(next){
   try{
      if(!this.isModified("password")){
        return next();
      }
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      return next();
   }
   catch(error) {
      return next(error);
   }
});

userSchema.methods.comparePassword = async function(candidatePassword, next){
   try {
     const isMatch = await bcrypt.compare(candidatePassword, this.password);
     return isMatch;
   }
  catch(error){
     return next(error);
   }
};

module.exports = mongoose.model("User", userSchema);