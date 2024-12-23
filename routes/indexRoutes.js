const express = require('express');
const router = express.Router();
const {indexController} = require('../controller/indexController')

router.get('/welcome', indexController);


module.exports = router;
