import { Op } from 'sequelize';
import { Lottery } from '../models/Lottery';
import { Ticket } from '../models/Ticket';

var currentLottery: Lottery | null
var previousLottery: Lottery | null

const initLottery = async (): Promise<Lottery> => {
    try {
        const initLottery = await Lottery.create({});
        currentLottery = initLottery;
        return initLottery;
    } catch (error) {
        throw new Error('initLottery error')
    }
}

const updateInMenmoryLottery = async (current: Lottery, previous: Lottery | null) => {
    currentLottery = current
    //* update winner info in previous lottery
    if (previous !== null) {
        previousLottery = previous
    }
}

const clearInMemoryLottery = async () => {
    currentLottery = null
    previousLottery = null
}

export const createLottery = async () => {
    //* save current lottery
    if (!currentLottery) {
        currentLottery = await getCurrentLottery()
    }
    await saveLottery(currentLottery)

    //* Create a new lottery
    const newLottery = await Lottery.create({});

    //* clear lottery in memory
    clearInMemoryLottery()

    return newLottery;
}

export const getLotteryById = async (lotteryId: number): Promise<Lottery | null> => {
    const lottery = await Lottery.findOne({
        where: { "id": lotteryId },
        include: {
            model: Ticket,
            required: false,
            where: { isWinner: true },
        },
    });
    return lottery || null;
}

export const saveLottery = async (lottery: Lottery): Promise<Lottery | null> => {
    try {
        lottery.finishedAt = new Date();
        await lottery.save()

        return lottery;
    } catch (error) {
        console.error('Error getting most recent lottery:', error);
        return null;
    }
}

export const getMostRecentFinishLottery = async (): Promise<Lottery | null> => {
    try {
        const lottery = await Lottery.findOne({
            where: {
                finishedAt: {
                    [Op.not]: null,
                },
            },
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Ticket,
                    where: { isWinner: true, },
                    required: false,
                },
            ],
        });

        return lottery

    } catch (error) {
        console.error('Error getting most recent lottery:', error);
        throw new Error('Error getting most recent lottery:')
    }
}

//!
export const getCurrentLottery = async (): Promise<Lottery> => {
    try {
        const lottery = await Lottery.findOne({
            where: { finishedAt: null },
            order: [['createdAt', 'DESC']],
        });

        //* no un-draw lottery is found
        if (!lottery) {
            const newLottery = await initLottery()
            return newLottery
        }

        return lottery

    } catch (error) {
        console.error('Error getting most recent lottery:', error);
        throw new Error('Error getting most recent lottery:')
    }
}

//!
export const getCurrentLotteryInMen = async (): Promise<Lottery | null> => {
    try {
        if (!currentLottery) {
            currentLottery = await getCurrentLottery()
        }
        return currentLottery
    } catch (error) {
        console.error('Error getting most recent lottery:', error);
        return null;
    }
}

//!
export const getLotteryInfo = async (): Promise<any | null> => {
    try {
        if (!currentLottery && !previousLottery) {
            return getLotteryInfoFromDb()
        } else {
            return { currentLottery, previousLottery }
        }
    } catch (error) {
        console.error('Error getting most recent lottery:', error);
        return null;
    }
}


export const getLotteryInfoFromDb = async (): Promise<any | null> => {
    try {
        const currentLotteryRecord = await getCurrentLottery()
        const previousLotteryRecord = await getMostRecentFinishLottery()
        updateInMenmoryLottery(currentLotteryRecord, previousLotteryRecord)
        return {
            "currentLottery": currentLotteryRecord,
            "previousLottery": previousLotteryRecord
        }

    } catch (error) {
        console.error('Error getting most recent lottery:', error);
        return null;
    }
}