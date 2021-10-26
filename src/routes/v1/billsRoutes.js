const express = require('express');
const billsController = require('../../controllers/billsController');
const router = express.Router();

const { authenticateToken } = require('../../utils/middleware');

router.get('/', billsController.groupsView);
router.post('/', authenticateToken, billsController.addGroup);
router.get('/groups', authenticateToken, billsController.groupsData);


router.get('/:groupId', billsController.billsView);
router.get('/:groupId/bill', authenticateToken, billsController.billData);
router.post('/:groupId', authenticateToken, billsController.addBill);

module.exports = router;