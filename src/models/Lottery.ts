import { Model, DataTypes } from 'sequelize';
import sequelize from '@config/database';
import { Ticket } from './Ticket';

class Lottery extends Model {
    public id!: number;
    public finishedAt!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Lottery.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        finishedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue:null,
        },
        // Other columns...
    },
    {
        tableName: 'lottery',
        modelName: 'lottery',
        sequelize,
    }
);

Lottery.hasMany(Ticket, { foreignKey: 'lotteryId' });

export { Lottery };