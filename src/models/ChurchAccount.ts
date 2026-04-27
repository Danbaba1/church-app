import { Model } from 'objection';
import Member from './Member';
import Event from './Event';

export default class ChurchAccount extends Model {
    id!: number;
    name!: string;
    address!: string;
    createdAt!: Date;
    updatedAt!: Date;

    members?: Member[];
    events?: Event[];

    static tableName = 'church_account';

    static relationMappings = () => ({
        members: {
            relation: Model.HasManyRelation,
            modelClass: Member,
            join: {
                from: 'church_account.id',
                to: 'members.church_id'
            }
        },
        events: {
            relation: Model.HasManyRelation,
            modelClass: Event,

            join: {
                from: 'church_account.id',
                to: 'events.church_id'
            }
        }
    })
}
