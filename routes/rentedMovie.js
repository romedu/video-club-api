const router = require("express").Router(),
      helpers = require("../helpers/rentedMovie"),
      {checkIfAdmin, getUser} = require("../middlewares");

router.route("/")
   .get(helpers.find)
   .post(getUser, helpers.create);

router.route("/:id")
   .get(helpers.findOne)
   .patch(checkIfAdmin, helpers.update)
   .delete(checkIfAdmin, getUser, helpers.delete);

module.exports = router;