const router = require("express").Router(),
      helpers = require("../helpers/rentedMovie"),
      {checkIfAdmin, getUser} = require("../middlewares"),
      movieMiddleware = require("../middlewares/movie");

router.route("/")
   .get(helpers.find)
   .post(getUser, movieMiddleware.checkIfAvailable, helpers.create);

router.route("/:id")
   .get(helpers.findOne)
   .patch(checkIfAdmin, helpers.update)
   .delete(checkIfAdmin, movieMiddleware.getMovie, helpers.delete);

module.exports = router;