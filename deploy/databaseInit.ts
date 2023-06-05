import { Sequelize } from 'sequelize';
import { Lottery } from '@models/Lottery';
import { Ticket } from '@models/Ticket';
import { Contestant } from '@models/Contestant';
import 'dotenv/config'

const sequelize = new Sequelize({
    database: process.env.DB,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    dialect: 'postgres',
});

const models = [Lottery, Contestant, Ticket];

const initializeModels = async () => {
    try {
        models.forEach((model) => model.sync());
        await sequelize.sync({ force: true });
        console.log('Models synchronized with the database.');
    } catch (error) {
        console.error('Error synchronizing models:', error);
    }
};

initializeModels();