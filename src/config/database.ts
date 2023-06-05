import { Sequelize } from 'sequelize';
import 'dotenv/config'

const sequelize = new Sequelize({
  database: process.env.DB,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"), // or the appropriate port for your database
  dialect: 'postgres', // or the appropriate database dialect
});

export default sequelize;