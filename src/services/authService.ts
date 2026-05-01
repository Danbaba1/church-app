import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserAccount from '../models/UserAccount';
import ChurchAccount from '../models/ChurchAccount';

export default class AuthService {
    static async register(
        userDetails: { email: string; password: string; firstName: string; lastName: string; telephone: string; gender: string; dateOfBirth: string },
        churchDetails: { churchName: string; churchAddress: string }
    ): Promise<UserAccount> {
        return await ChurchAccount.transaction(async trx => {
            const existingChurch = await ChurchAccount.query(trx).findOne({ name: churchDetails.churchName });
            if (existingChurch) {
                throw new Error('Church with that name already exists');
            }
            const existingUser = await UserAccount.query(trx).findOne({ email: userDetails.email });
            if (existingUser) {
                throw new Error('User with that email already exists');
            }
            const church = await ChurchAccount.query(trx).insertAndFetch({ name: churchDetails.churchName, address: churchDetails.churchAddress } as any);
            const user = await UserAccount.query(trx).insert({
                church_id: church.id,
                email: userDetails.email,
                password_hash: await bcrypt.hash(userDetails.password, 10),
                first_name: userDetails.firstName,
                last_name: userDetails.lastName,
                telephone: userDetails.telephone,
                gender: userDetails.gender,
                date_of_birth: userDetails.dateOfBirth,
            } as any);
            const result = await UserAccount.query(trx)
                .withGraphFetched('church')
                .findById(user.id);
            return result as UserAccount;
        });
    };

}
