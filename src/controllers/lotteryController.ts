import { Request, Response } from 'express';
import {
    createLottery,
    getLotteryById,
    getLotteryInfo
} from '@services/lotteryService'

exports.getLotteryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const lotteryId = parseInt(id, 10);
        const lottery = await getLotteryById(lotteryId);
        if (!lottery) {
            res.status(404).json({ error: 'Lottery not found' });
            return;
        }
        res.json(lottery);
    } catch (error) {
        console.error('Error getting lottery:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getCurrentLottery = async (req: Request, res: Response): Promise<void> => {
    try {
        const lottery = await getLotteryInfo();
        res.json(lottery);
    } catch (error) {
        console.error('Error getting lottery:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

