import { Sequelize } from 'sequelize';
import 'dotenv/config'

const sequelize = new Sequelize({
  database: process.env.DB,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"), 
  dialect: 'postgres', 
});

export default sequelize;