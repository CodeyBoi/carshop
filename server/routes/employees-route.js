const express = require('express');
const employeesRoutes = require('../controllers/employees-controller.js');

const router = express.Router();
router.get('', employeesRoutes.employeesAll);
router.get('/sales', employeesRoutes.employeeSales);

module.exports = router;
