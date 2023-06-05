import { Ticket } from '../models/Ticket';
import { v4 as uuidv4 } from 'uuid';

export const getTickets = async (): Promise<any> => {
    try {
        const tickets = await Ticket.findAll();
        return tickets.map((ticket) => ticket.toJSON())
    } catch (error) {
        console.error('Error retrieving tickets:', error);
        throw new Error('Error retrieving tickets');
    }
};

export const getTicketById = async (ticketId: string) => {
    try {
        const ticket = await Ticket.findByPk(ticketId);
        return ticket || null
    } catch (error) {
        throw error;
    }
}

export const getTicketByLotteryWinner = async (lotteryId: number) => {
    try {
        const ticket = await Ticket.findOne({ where: { lotteryId, isWinner: true }, });
        return ticket || null
    } catch (error) {
        throw error;
    }
}

export const getTicketByLotteryId = async (lotteryId: string): Promise<Ticket[]> => {
    try {
        const tickets = await Ticket.findAll({
            where: { lotteryId },
        });
        return tickets;
    } catch (error) {
        console.error('Error getting tickets by lottery ID:', error);
        return [];
    }
}
export const generateTicket = async (lotteryId: number, contestantId: number) => {
    try {
        const ticket = await Ticket.create({
            lotteryId,
            contestantId,
            ticketId: uuidv4(),
        });
        return ticket
    } catch (error) {
        throw error;
    }
}

export const updateWinnerTicket = async (ticket: Ticket) => {
    try {
        ticket.isWinner = true
        await ticket.save()
        return ticket
    } catch (error) {
        throw error;
    }
}

