const express = require('express');
const carmodelsRoutes = require('../controllers/carmodels-controller.js');

const router = express.Router();
router.get('', carmodelsRoutes.carmodelsAll);
router.post('', carmodelsRoutes.carmodelCreate);
router.delete('/:id', carmodelsRoutes.carmodelDelete);

module.exports = router;
