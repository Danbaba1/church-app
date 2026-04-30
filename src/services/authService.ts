import Member  from '../models/Member';

export default class MemberService {
    async createMember(data, () => {
        try {
            const member = await Member.query().insert(data);
            return member;
        } catch(err) {
            console.error(err);
        }
    })
}
