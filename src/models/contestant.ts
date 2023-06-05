import { Model, DataTypes } from 'sequelize';
import sequelize from '@config/database';
import { Ticket } from './Ticket';

class Contestant extends Model {
    public id!: number;
    public name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    tickets!: Ticket[]
}

Contestant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'contestants',
        modelName: 'contestant',
        sequelize,
    }
);

Contestant.hasMany(Ticket, {as: 'tickets', foreignKey: 'contestantId'});



export { Contestant };
