import UserAccount from "../models/UserAccount";

declare global {
    namespace Express {
        interface Request {
            user?: UserAccount;
        }
    }
}