const { Router } = require('express');
const { login , viewAcceso} = require('../controllers/acceso.controller');

const routerAcceso = Router();
routerAcceso.get('', viewAcceso);
routerAcceso.post('/login', login);


module.exports = routerAcceso;