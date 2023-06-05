import express from 'express';
const contestantController = require('@controllers/contestantController')
const router = express.Router();

router.get('/:id', contestantController.getContestant);
router.post('/', contestantController.createContestant);
router.patch('/:id', contestantController.updateContestant);
router.delete('/:id', contestantController.deleteContestant);

export default router;
