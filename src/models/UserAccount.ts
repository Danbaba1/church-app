import { Model } from 'objection';
import ChurchAccount from './ChurchAccount';

export default class UserAccount extends Model {
    id!: number;
    churchId!: number;
    firstName!: string;
    lastName!: string;
    telephone!: string;
    dateOfBirth!: Date;
    email!: string;
    gender!: string;
    passwordHash!: string;
    createdAt!: Date;
    updatedAt!: Date;

    church?: ChurchAccount;

    static tableName = 'user_accounts';

    static relationMappings = () => ({
        church: {
            relation: Model.BelongsToOneRelation,
            modelClass: ChurchAccount,
            join: {
                from: 'user_accounts.church_id',
                to: 'church_account.id'
            }
        }
    })
}