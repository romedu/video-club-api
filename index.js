require("dotenv").config();

const app = require("express")(),
      bodyParser = require("body-parser"),
      {PORT} = process.env,
      authRoutes = require("./routes/auth"),
      userRoutes = require("./routes/user"),
      movieRoutes = require("./routes/movie"),
      rentedMovieRoutes = require("./routes/rentedMovie"),
      {sanitizeBody, checkIfToken, checkIfAdmin} = require("./middlewares");
      
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/auth", sanitizeBody, authRoutes);
app.use("/api/users", checkIfToken, checkIfAdmin, sanitizeBody, userRoutes);
app.use("/api/movies", sanitizeBody, movieRoutes);
app.use("/api/rentedMovies", checkIfToken, sanitizeBody, rentedMovieRoutes);

app.listen(PORT || 3000, () => {
   console.log("Server's up"); 
});