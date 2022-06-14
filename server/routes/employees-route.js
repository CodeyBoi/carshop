const express = require('express');
const employeesRoutes = require('../controllers/employees-controller.js');

const router = express.Router();
router.get('', employeesRoutes.employeesAll);

module.exports = router;
