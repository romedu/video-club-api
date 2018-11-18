const router = require("express").Router(),
      helpers = require("../helpers/user");

router.get("/", helpers.find);
//NO CREATE METHOD SINCE THAT'S WHAT THE REGISTER ROUTE IS FOR

router.route("/:id")
   .get(helpers.findOne)
   .patch(helpers.update)
   .delete(helpers.delete);

module.exports = router;