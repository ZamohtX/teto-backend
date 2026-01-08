export class User {
    id: string;
    name: string;
    email: string;
    password?: string;
    avatarUrl?: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<User>){
        Object.assign(this, partial);
    }
}