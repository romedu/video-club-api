const router = require("express").Router(),
      helpers = require("../helpers/services");

router.get("/searchMovies", helpers.searchMovies);

module.exports = router;