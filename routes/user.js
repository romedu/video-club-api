const router = require("express").Router(),
      helpers = require("../helpers/user"),
      {checkIfAdmin, checkIfSameUser} = require("../middlewares");

router.get("/", checkIfAdmin, helpers.find);
//NO CREATE METHOD SINCE THAT'S WHAT THE REGISTER ROUTE IS FOR

router.route("/:id")
   .get(checkIfSameUser, helpers.findOne)
   .patch(checkIfAdmin, helpers.update)
   .delete(checkIfAdmin, helpers.delete);

module.exports = router;