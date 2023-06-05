import { Request, Response } from 'express';
import { Ticket } from '../models/Ticket';

import {
    getTicketById,
    generateTicket,
    getTickets
} from '@services/ticketService'

import {
    getCurrentLottery,
} from '@services/lotteryService'

import { getContestantById } from '@services/contestantService';

exports.getAllTickets = async (req: Request, res: Response): Promise<any> => {
    try {
        const ticket = await getTickets();
        res.status(200).json(ticket);
    } catch (error) {
        console.error('Error generating ticket:', error);
        res.status(500).json({ error: 'Failed to generate ticket' });
    }
}

exports.getTicket = async (req: Request, res: Response): Promise<any> => {
    const ticketId = req.params.id;
    try {
        const ticket = await getTicketById(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.generateTicket = async (req: Request, res: Response): Promise<void> => {
    try {
        const { contestantId } = req.body
        const lottery = await getCurrentLottery()
        if (!lottery) {
            res.status(500).json({ error: 'Failed to generate ticket' });
            return
        }

        const contestant = await getContestantById(parseInt(contestantId))
        if (!contestant) {
            res.status(404).json({ error: 'contestant not exist' });
            return 
        }

        let contestantTicket = contestant.tickets.find((ticket:Ticket) => ticket.lotteryId === lottery.id);
        if(contestantTicket){
            res.status(409).json({ error: 'ticket already exist' });
            return
        }

        const ticket = await generateTicket(lottery.id, contestant.id);
        res.status(200).json(ticket);
    } catch (error) {
        console.error('Error generating ticket:', error);
        res.status(500).json({ error: 'Failed to generate ticket' });
    }
};
