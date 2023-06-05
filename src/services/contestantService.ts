import { Ticket } from '@models/Ticket';
import { Contestant } from '../models/contestant';

import 'dotenv/config'

export const getContestantById = async (contestantId: number): Promise<Contestant | null> => {
    try {
        const contestant = await Contestant.findOne({
            where: { id: contestantId, },
            include: [
                {
                    model: Ticket,
                    as: 'tickets',
                    required: false,
                },
            ],
        });
        return contestant || null
    } catch (error) {
        throw error;
    }
}

export const createContestant = async (name: string) => {
    try {
        const contestant = await Contestant.create({ name });
        return contestant
    } catch (error) {
        throw error;
    }
}


export const updateContestant = async (contestantId: string, name: string): Promise<Contestant | null> => {
    try {
        const contestant = await Contestant.findByPk(contestantId);

        if (contestant) {
            contestant.name = name;
            await contestant.save();
            return contestant;
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

export const deleteContestant = async (contestantId: string): Promise<boolean> => {
    try {
        const success = await Contestant.destroy({ where: { id: contestantId, }, });
        return success !== 0
    } catch (error) {
        throw error;
    }
}
