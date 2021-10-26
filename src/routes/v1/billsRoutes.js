const express = require('express');
const billsController = require('../../controllers/billsController');
const router = express.Router();

router.get('/', billsController.groupsView);
router.post('/', billsController.addGroup);

router.get('/:groupId', billsController.billsView);
router.post('/:groupId', billsController.addBill);

module.exports = router;