require("dotenv").config();

const app = require("express")(),
      cors = require("cors"),
      bodyParser = require("body-parser"),
      expressSanitizer   = require('express-sanitizer'),
      {PORT} = process.env,
      authRoutes = require("./routes/auth"),
      userRoutes = require("./routes/user"),
      movieRoutes = require("./routes/movie"),
      rentedMovieRoutes = require("./routes/rentedMovie"),
      servicesRoutes = require("./routes/services"),
      {sanitizeBody, checkIfToken, checkIfAdmin} = require("./middlewares");

app.use(cors());      
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());

app.use("/api/auth", sanitizeBody, authRoutes);
app.use("/api/users", checkIfToken, checkIfAdmin, sanitizeBody, userRoutes);
app.use("/api/movies", sanitizeBody, movieRoutes);
app.use("/api/rentedMovies", checkIfToken, sanitizeBody, rentedMovieRoutes);
app.use("/api/services", sanitizeBody, servicesRoutes);

app.use((error, req, res, next) => {
   if(!error.status) error.status = 500;
   return res.status(error.status).json({message: error.message});
});

app.listen(PORT || 3000, () => {
   console.log("Server's up"); 
});