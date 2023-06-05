import { Lottery } from '../models/Lottery';
import { Ticket } from '../models/Ticket';
import 'dotenv/config'

// const lotteryService = require('@services/lotteryService')
// const ticketService = require('@services/ticketService')

import {
    getCurrentLottery,
    createLottery
}from'@services/lotteryService'

import {
    updateWinnerTicket
}from'@services/ticketService'

export const scheduleDraw = () => {
    const draw_interval = process.env.DRAW_INTERVAL;
    const intervals = parseInt(draw_interval || "10", 10) * 1000   
    setInterval(drawWinner, intervals);
};

export const decideWinner = (tickets: Ticket[]): Ticket | null => {
    if (tickets.length === 0) {
        return null
    }
    const randomIndex = Math.floor(Math.random() * tickets.length);
    const winnerTicket = tickets[randomIndex];
    return winnerTicket
}

export const drawWinner = async (): Promise<any> => {
    const currentLottery = await getCurrentLottery();
    if (!currentLottery) { throw new Error('No on going lottery'); }

    const lotteryTickets = await Ticket.findAll({ where: { lotteryId: currentLottery.id }, });

    const winnerTicket = decideWinner(lotteryTickets)

    if (winnerTicket) { await updateWinnerTicket(winnerTicket) }

    const newLottery = await createLottery()

    return { currentLottery, newLottery }
}
