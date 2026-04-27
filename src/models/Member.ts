import { Model } from 'objection';
import ChurchAccount from './ChurchAccount';
import Reminder from './Reminder';
import Event from './Event';

export default class Member extends Model {
    id!: number;
    churchId!: number;
    firstname!: string;
    lastname!: string;
    email!: string;
    phone!: string;
    gender!: string;
    dateOfBirth!: Date;
    dateJoined!: Date;
    address!: string;
    createdAt!: Date;
    updatedAt!: Date;

    member?: Member;
    events?: Event[];
    reminders?: Reminder[];
    church?: ChurchAccount;
    
    static tableName = 'members';

    static relationMappings = () => ({
        church: {
            relation: Model.BelongsToOneRelation,
            modelClass: ChurchAccount,
            join: {
                from: 'members.church_id',
                to: 'church_account.id'
            }
        },
        events: {
            relation: Model.ManyToManyRelation,

            modelClass: Event,

            join: {
                from: 'members.id',
                through: {
                    from: 'attendance.member_id',
                    to: 'attendance.event_id'
                },

                to: 'events.id'
            }
        },
        reminders: {
            relation: Model.HasManyRelation,
            modelClass: Reminder,
            join: {
                from: 'members.id',
                to: 'reminders.member_id'
            }
        }
    })
}
