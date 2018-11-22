const router = require("express").Router(),
      helpers = require("../helpers/services");

router.post("/searchMovies", helpers.searchMovies);
router.post("/searchMovieById", helpers.searchMovieById);

module.exports = router;