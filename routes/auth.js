const express = require("express"),
      router = express.Router(),
      helpers = require('../helpers/auth'),
      middleware = require("../middlewares");

router.post('/login', helpers.login);
router.post('/register', middleware.checkAdminPassword, helpers.register);
router.get("/verifyToken", middleware.checkIfToken, helpers.verifyToken);

module.exports = router;