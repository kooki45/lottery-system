import { Model, DataTypes } from 'sequelize';
import sequelize from '@config/database';
class Ticket extends Model {
    public id!: number;
    public lotteryId!: number;
    public ticketNumber!: string;
    public isWinner!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Ticket.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        lotteryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'lottery',
                key: 'id',
            },
        },
        ticketId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        contestantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'contestants',
                key: 'id',
            },
        },
        isWinner: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        // Other columns...
    },
    {
        tableName: 'tickets',
        modelName: 'ticket',
        sequelize,
    }
);


export { Ticket };