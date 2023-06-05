import { NextFunction, Request, Response } from 'express';
import {
    createContestant,
    getContestantById,
    updateContestant,
    deleteContestant
}from '@services/contestantService'

exports.createContestant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body
        const contestant = await createContestant(name);
        res.json(contestant);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getContestant = async (req: Request, res: Response): Promise<void> => {
    try {
        const contestantId = req.params.id;
        const contestant = await getContestantById(parseInt(contestantId));
        if(!contestant){
            res.status(404).json({ error: 'Contestant not exist' });
            return;
        }
        res.json(contestant);
    } catch (error) {
        console.error("error:", error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateContestant = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    try {
        const contestantId = req.params.id;
        const { name } = req.body;
        const updatedContestant = await updateContestant(contestantId, name);
        if(!updatedContestant){
            res.status(404).json({ error: 'Contestant not exist' });
            return
        }
        res.json(updatedContestant);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteContestant = async (req: Request, res: Response): Promise<void> => {
    try {
        const contestantId = req.params.id;
        const resultSuccess = await deleteContestant(contestantId);
        if(!resultSuccess){
            res.status(404).json({ error: 'Contestant not exist' });
            return
        }
        res.status(200).json({ message: 'Contestant deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

