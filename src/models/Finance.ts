import { Model } from 'objection';
import Event from './Event';

export default class Finance extends Model {
    id!: number;
    eventId!: number;
    givingType!: string;
    amount!: number;
    date!: Date;
    createdAt!: Date;
    updatedAt!: Date;

    event?: Event;

    static tableName = 'finances';

    static relationMappings = () => ({
        event: {
            relation: Model.BelongsToOneRelation,
            modelClass: Event,
            join: {
                from: 'finances.event_id',
                to: 'events.id'
            }
        }
    })
}