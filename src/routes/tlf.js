const express = require('express');

const router = express.Router();
const formacionDocenteController = require('../controller/formacionDocenteController');
const logearse= require('../controller/loginController');

router.post('/enviarDatos', formacionDocenteController.insertarDatos);
router.post('/login',logearse.);
module.exports = router