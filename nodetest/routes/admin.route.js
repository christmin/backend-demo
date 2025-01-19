const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller'); 
const { authenticateAdmin } = require('../middleware/authenticate'); 


router.post('/login', AdminController.login);


module.exports = router;
