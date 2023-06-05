import express, { Request, Response } from 'express';
const ticketController = require('@controllers/ticketControllers')

const router = express.Router();

router.get('/', ticketController.getAllTickets);
router.get('/:id', ticketController.getTicket);
router.post('/', ticketController.generateTicket);

export default router;