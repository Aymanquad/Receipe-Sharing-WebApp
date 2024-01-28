const express = require('express');
const router = express.Router();

const receipeController = require('../controllers/receipes');

router.get('/', receipeController.mainPg);



module.exports = router;
