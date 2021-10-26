const express = require('express');
const accountsController = require('../../controllers/accountsController');
const router = express.Router();
const { validateRegister } = require('../../utils/validateHelper');

router.get('/login', accountsController.loginView);
router.get('/register', accountsController.registerView);

router.post('/login', validateRegister, accountsController.login);
router.post('/register', validateRegister, accountsController.register);

module.exports = router;