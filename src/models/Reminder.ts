import { Model } from 'objection';
import Member from './Member';

export default class Reminder extends Model {
    id!: number;
    memberId!: number;
    occasionType!: string;
    occasionDate!: Date;
    createdAt!: Date;
    updatedAt!: Date;

    member?: Member;

    static tableName = 'reminders';

    static relationMappings = () => ({
        member: {
            relation: Model.BelongsToOneRelation,
            modelClass: Member,
            join: {
                from: 'reminders.member_id',
                to: 'members.id'
            }
        }
    })
}