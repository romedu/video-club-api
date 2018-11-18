const router = require("express").Router(),
      helpers = require("../helpers/movie"),
      {checkIfToken, checkIfAdmin} = require("../middlewares");

router.route("/")
   .get(helpers.find)
   .post(checkIfToken, helpers.create);

router.route("/:id")
   .get(helpers.findOne)
   .patch(checkIfToken, checkIfAdmin, helpers.update)
   .delete(checkIfToken, checkIfAdmin, helpers.delete);

module.exports = router;