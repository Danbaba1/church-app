import { Model } from "objection";
import Member from "./Member";
import Event from "./Event";

export default class Attendance extends Model {
    id!: number;
    memberId!: number;
    eventId!: number;
    present!: boolean;
    createdAt!: Date;
    updatedAt!: Date;

    member?: Member;
    event?: Event;

    static tableName = 'attendance';

    static relationMappings = () => ({
        member: {
            relation: Model.BelongsToOneRelation,
            modelClass: Member,
            join: {
                from: 'attendance.member_id',
                to: 'members.id'
            }
        },
        event: {
            relation: Model.BelongsToOneRelation,
            modelClass: Event,
            join: {
                from: 'attendance.event_id',
                to: 'events.id'
            }
        }
    })
}
