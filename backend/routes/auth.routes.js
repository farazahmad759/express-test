var express = require('express');
var router = express.Router();
const controller = require('../controllers/auth.controller.js');

router.post('/login', controller.login);

module.exports = router;
