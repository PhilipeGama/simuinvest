export class IUser {
    _id?: string;
    name: string;
    email: string;
    profile?: string;
    phone: string;
    createdAt: Date;
    updatedAt?: Date;
}