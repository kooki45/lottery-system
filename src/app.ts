import express from 'express';
import { Request, Response, NextFunction, Application } from 'express';
import bodyParser from 'body-parser';
import ticketRoutes from '@routes/ticketRoutes';
import lotteryRoutes from '@routes/lotteryRoutes';
import contestantRoutes from '@routes/contestantRoutes';
import { scheduleDraw } from '@services/drawService';


const app = express();

app.use(bodyParser.json());

app.use('/api/ticket', ticketRoutes);
app.use('/api/lottery', lotteryRoutes);
app.use('/api/contestant', contestantRoutes);

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
};

scheduleDraw();

app.use(errorHandler);

export default app;