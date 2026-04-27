import { Model } from 'objection';
import ChurchAccount from './ChurchAccount';
import Attendance from './Attendance';
import Finance from './Finance';
import Member from './Member';

export default class Event extends Model {
    id!: number;
    churchId!: number;
    name!: string;
    description!: string;
    date!: Date;
    type!: string;
    createdAt!: Date;
    updatedAt!: Date;

    church?: ChurchAccount;
    attendances?: Attendance[];

    static tableName = 'events';

    static relationMappings = () => ({
        church: {
            relation: Model.BelongsToOneRelation,
            modelClass: ChurchAccount,

            join: {
                from: 'events.church_id',
                to: 'church_account.id'
            }
        },
        attendances: {
            relation: Model.HasManyRelation,
            modelClass: Attendance,

            join: {
                from: 'events.id',
                to: 'attendance.event_id'
            }
        },
        finances: {
            relation: Model.HasManyRelation,
            modelClass: Finance,
            join: {
                from: 'events.id',
                to: 'finances.event_id'
            }
        },
        members: {
            relation: Model.ManyToManyRelation,
            modelClass: Member,
            join: {
                from: 'events.id',
                through: {
                    from: 'attendance.event_id',
                    to: 'attendance.member_id'
                },
                to: 'members.id'
            }
        }
    })
}