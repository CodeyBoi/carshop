const express = require('express');
const usersRoutes = require('../controllers/users-controller.js');

const router = express.Router();
router.get('', usersRoutes.usersGet);
router.post('', usersRoutes.userCreate);
router.post('/login', usersRoutes.userLogin);

module.exports = router;
