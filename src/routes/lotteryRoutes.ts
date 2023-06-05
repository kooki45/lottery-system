import express from 'express';
const lotteryController = require('@controllers/lotteryController')
const router = express.Router();


//! testRoute
router.get('/', lotteryController.getCurrentLottery);
router.get('/:id', lotteryController.getLotteryById);

export default router;
